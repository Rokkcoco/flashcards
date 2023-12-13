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
    <g clipPath={'url(#clip0_5661_1671)'}>
      <path
        d={
          'M20.42 10.18L12.71 2.29999C12.617 2.20627 12.5064 2.13187 12.3846 2.0811C12.2627 2.03033 12.132 2.0042 12 2.0042C11.868 2.0042 11.7373 2.03033 11.6154 2.0811C11.4936 2.13187 11.383 2.20627 11.29 2.29999L3.57999 10.19C3.39343 10.3781 3.24609 10.6013 3.14652 10.8468C3.04695 11.0923 2.99715 11.3551 2.99999 11.62V20C2.99922 20.5119 3.19477 21.0046 3.54637 21.3767C3.89797 21.7488 4.37885 21.9718 4.88999 22H19.11C19.6211 21.9718 20.102 21.7488 20.4536 21.3767C20.8052 21.0046 21.0008 20.5119 21 20V11.62C21.0008 11.0829 20.7928 10.5666 20.42 10.18ZM9.99999 20V14H14V20H9.99999ZM19 20H16V13C16 12.7348 15.8946 12.4804 15.7071 12.2929C15.5196 12.1054 15.2652 12 15 12H8.99999C8.73478 12 8.48042 12.1054 8.29289 12.2929C8.10535 12.4804 7.99999 12.7348 7.99999 13V20H4.99999V11.58L12 4.42999L19 11.62V20Z'
        }
        fill={'black'}
      />
    </g>
    <defs>
      <clipPath id={'clip0_5661_1671'}>
        <rect fill={'white'} height={24} width={24} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
