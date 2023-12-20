import { useState } from 'react'

import clsx from 'clsx'

import s from './pagination.module.scss'

type Props = {
  currrentPage: number
  onPageChange: () => void
  pageSise: number
  totalCount: number
}

export const Pagination: React.FC<Props> = ({
  currrentPage,
  onPageChange,
  pageSise,
  totalCount,
}) => {
  const [current, setCurrent] = useState<number>(currrentPage)
  const pagesCount = Math.ceil(totalCount / pageSise)
  const pagesArr = []

  for (let i = 0; i < pagesCount; i++) {
    pagesArr.push(i + 1)
  }

  const onPageChangeHandler = (page: number) => {
    console.log(page)
    setCurrent(page)
    onPageChange()
  }

  const back = () => {
    if (current === 1) {
      return setCurrent(pagesCount)
    }
    setCurrent(current - 1)
  }

  const forward = () => {
    if (current === pagesCount) {
      return setCurrent(1)
    }
    setCurrent(current + 1)
  }

  const pages = pagesArr.map((item: number) => {
    return (
      <div key={item}>
        <p
          className={clsx(current === item ? s.red : '')}
          onClick={() => {
            onPageChangeHandler(item)
          }}
          style={{ margin: '0 10px' }}
        >
          {item}
        </p>
      </div>
    )
  })

  return (
    <div>
      {current}
      <div style={{ display: 'flex' }}>
        <div onClick={back}>Back</div>
        {pages}
        <div onClick={forward}>Forward</div>
        <Select
          onChangePage={(page: number) => {
            setCurrent(page)
          }}
          options={[10, 20, 30, 50, 100]}
        />
      </div>
    </div>
  )
}

type SelectType = {
  onChangePage: (page: number) => void
  options: number[] | string[]
}

export const Select: React.FC<SelectType> = ({ onChangePage, options }) => {
  const [selectedFruit, setSelectedFruit] = useState(options[0]) // Declare a state variable...

  const onChange = (e: any) => {
    setSelectedFruit(parseInt(e.target.value))
    onChangePage(e.target.value)
  }

  // ...
  return (
    <div>
      {selectedFruit}
      <select
        onChange={onChange} // ... and update the state variable on any change!
        style={{ color: 'black' }}
        value={selectedFruit} // ...force the select's value to match the state variable...
      >
        {options.map(el => {
          return (
            <option key={el} value={el}>
              {el}
            </option>
          )
        })}
      </select>
    </div>
  )
}
