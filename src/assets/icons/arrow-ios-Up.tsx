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
    <g clipPath={'url(#clip0_5661_1854)'}>
      <path
        d={
          'M19.5416 14.5142C19.542 14.7478 19.4606 14.9742 19.3116 15.1542C19.2276 15.2554 19.1245 15.3391 19.0082 15.4005C18.8918 15.4618 18.7645 15.4996 18.6335 15.5117C18.5026 15.5238 18.3705 15.5099 18.2449 15.4708C18.1193 15.4318 18.0026 15.3684 17.9016 15.2842L12.5416 10.8042L7.17157 15.1242C7.06928 15.2072 6.95158 15.2693 6.82524 15.3067C6.6989 15.3441 6.56641 15.3562 6.43538 15.3423C6.30436 15.3283 6.17737 15.2886 6.06174 15.2255C5.9461 15.1623 5.84409 15.0769 5.76157 14.9742C5.67053 14.8707 5.60186 14.7495 5.55987 14.6183C5.51788 14.487 5.50348 14.3485 5.51757 14.2114C5.53165 14.0743 5.57392 13.9416 5.64172 13.8216C5.70952 13.7016 5.80139 13.5969 5.91157 13.5142L11.9116 8.68415C12.0905 8.53707 12.3149 8.45667 12.5466 8.45667C12.7782 8.45667 13.0026 8.53707 13.1816 8.68415L19.1816 13.6842C19.3026 13.7845 19.3982 13.9119 19.4608 14.0561C19.5233 14.2003 19.551 14.3572 19.5416 14.5142Z'
        }
        fill={'currentColor'}
      />
    </g>
    <defs>
      <clipPath id={'clip0_5661_1854'}>
        <rect fill={'white'} height={24} width={24} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
