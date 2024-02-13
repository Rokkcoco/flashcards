import s from './loader.module.scss'
export const Loader = () => {
  return (
    <span className={s.wrapper}>
      <span className={s.loader}></span>
    </span>
  )
}
