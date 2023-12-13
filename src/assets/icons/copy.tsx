import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#clip0_5661_1926)'}>
      <path
        d={
          'M18 9H15V5.67C14.9974 4.96268 14.7152 4.28509 14.2151 3.78494C13.7149 3.28478 13.0373 3.00263 12.33 3H5.67C4.96268 3.00263 4.28509 3.28478 3.78494 3.78494C3.28478 4.28509 3.00263 4.96268 3 5.67V12.33C3.00263 13.0373 3.28478 13.7149 3.78494 14.2151C4.28509 14.7152 4.96268 14.9974 5.67 15H9V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V12C21 11.2044 20.6839 10.4413 20.1213 9.87868C19.5587 9.31607 18.7956 9 18 9ZM9 12V13H5.67C5.49231 13 5.32189 12.9294 5.19624 12.8038C5.07059 12.6781 5 12.5077 5 12.33V5.67C5 5.49231 5.07059 5.32189 5.19624 5.19624C5.32189 5.07059 5.49231 5 5.67 5H12.33C12.5077 5 12.6781 5.07059 12.8038 5.19624C12.9294 5.32189 13 5.49231 13 5.67V9H12C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12Z'
        }
        fill={'black'}
      />
    </g>
    <defs>
      <clipPath id={'clip0_5661_1926'}>
        <rect fill={'white'} height={24} width={24} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
