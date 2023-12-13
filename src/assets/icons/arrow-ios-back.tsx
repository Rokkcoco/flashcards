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
    <g clipPath={'url(#clip0_5661_1844)'}>
      <path
        d={
          'M13.83 19C13.6806 19.0005 13.533 18.9675 13.398 18.9035C13.263 18.8395 13.1441 18.746 13.05 18.63L8.22 12.63C8.07292 12.4511 7.99251 12.2266 7.99251 11.995C7.99251 11.7634 8.07292 11.5389 8.22 11.36L13.22 5.36C13.3897 5.15578 13.6336 5.02736 13.8981 5.00298C14.1625 4.9786 14.4258 5.06026 14.63 5.23C14.8342 5.39974 14.9626 5.64365 14.987 5.90808C15.0114 6.1725 14.9297 6.43578 14.76 6.64L10.29 12L14.61 17.36C14.7323 17.5068 14.81 17.6855 14.8338 17.8751C14.8577 18.0646 14.8268 18.257 14.7447 18.4296C14.6627 18.6021 14.5329 18.7475 14.3708 18.8486C14.2087 18.9497 14.021 19.0022 13.83 19Z'
        }
        fill={'black'}
      />
    </g>
    <defs>
      <clipPath id={'clip0_5661_1844'}>
        <rect fill={'white'} height={24} width={24} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
