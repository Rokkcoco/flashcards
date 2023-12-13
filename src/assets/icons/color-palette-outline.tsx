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
    <g clipPath={'url(#clip0_5661_2059)'}>
      <path
        d={
          'M19.54 5.08C18.5374 4.08442 17.346 3.29914 16.0357 2.77024C14.7255 2.24134 13.3228 1.97947 11.91 2C9.25783 1.99337 6.71166 3.04058 4.83161 4.91125C2.95156 6.78193 1.89163 9.32284 1.885 11.975C1.87837 14.6272 2.92558 17.1733 4.79625 19.0534C6.66693 20.9334 9.20783 21.9934 11.86 22C12.4315 22.0097 12.99 21.8294 13.448 21.4873C13.9059 21.1452 14.2372 20.6608 14.39 20.11C14.4874 19.7122 14.4864 19.2968 14.3871 18.8995C14.2877 18.5022 14.0931 18.1351 13.82 17.83C13.7569 17.7581 13.7156 17.6697 13.7013 17.5751C13.6869 17.4805 13.7 17.3838 13.7389 17.2964C13.7779 17.209 13.8411 17.1346 13.921 17.0821C14.001 17.0296 14.0943 17.0011 14.19 17H15.84C17.3929 17.0073 18.8912 16.4267 20.0338 15.375C21.1764 14.3233 21.8788 12.8782 22 11.33C22.0372 10.1756 21.8382 9.02579 21.4152 7.95106C20.9922 6.87633 20.3541 5.89933 19.54 5.08ZM15.88 15H14.23C13.7481 14.9973 13.2758 15.1344 12.8704 15.3948C12.4649 15.6552 12.1437 16.0277 11.9457 16.467C11.7478 16.9064 11.6815 17.3937 11.7551 17.8699C11.8286 18.3462 12.0387 18.7908 12.36 19.15C12.4226 19.2131 12.4668 19.2921 12.4879 19.3784C12.509 19.4647 12.5063 19.5551 12.48 19.64C12.43 19.85 12.2 19.98 11.89 20C10.7543 19.9854 9.63476 19.7292 8.60579 19.2484C7.57681 18.7676 6.66201 18.0732 5.92224 17.2114C5.18247 16.3496 4.63468 15.3401 4.31531 14.2502C3.99594 13.1602 3.91232 12.0148 4.07 10.89C4.35517 8.99995 5.29955 7.27163 6.73614 6.01073C8.17272 4.74984 10.0089 4.0376 11.92 4H12C13.1308 3.98519 14.2532 4.19701 15.3009 4.62294C16.3485 5.04888 17.3003 5.68031 18.1 6.48C18.724 7.1044 19.2143 7.84935 19.5409 8.66944C19.8676 9.48953 20.0238 10.3676 20 11.25C19.8965 12.2731 19.4186 13.2218 18.6581 13.914C17.8976 14.6061 16.9083 14.9929 15.88 15Z'
        }
        fill={'black'}
      />
      <path
        d={
          'M12 8C12.8284 8 13.5 7.32843 13.5 6.5C13.5 5.67157 12.8284 5 12 5C11.1716 5 10.5 5.67157 10.5 6.5C10.5 7.32843 11.1716 8 12 8Z'
        }
        fill={'black'}
      />
      <path
        d={
          'M15.25 7.2C14.9932 7.34836 14.7861 7.56953 14.6549 7.83556C14.5238 8.10158 14.4744 8.40052 14.5131 8.69459C14.5518 8.98865 14.6768 9.26464 14.8724 9.48768C15.0679 9.71071 15.3251 9.87077 15.6116 9.94763C15.8981 10.0245 16.2009 10.0147 16.4818 9.91948C16.7627 9.82427 17.0091 9.64792 17.1898 9.41272C17.3705 9.17751 17.4774 8.89402 17.497 8.59807C17.5166 8.30212 17.4481 8.00699 17.3 7.75C17.2016 7.5792 17.0705 7.42947 16.9142 7.30938C16.7578 7.18928 16.5794 7.10118 16.389 7.0501C16.1986 6.99902 16 6.98596 15.8046 7.01169C15.6091 7.03741 15.4207 7.1014 15.25 7.2Z'
        }
        fill={'black'}
      />
      <path
        d={
          'M8.75 7.2C8.49301 7.05192 8.19788 6.98336 7.90193 7.00298C7.60598 7.0226 7.32249 7.12951 7.08728 7.31021C6.85208 7.49091 6.67573 7.73728 6.58052 8.01819C6.48531 8.29909 6.47552 8.60192 6.55237 8.88839C6.62923 9.17486 6.78929 9.43211 7.01232 9.62763C7.23536 9.82316 7.51135 9.94817 7.80541 9.98687C8.09948 10.0256 8.39842 9.97623 8.66444 9.84507C8.93047 9.71391 9.15164 9.50683 9.3 9.25C9.3986 9.07931 9.46259 8.89086 9.48831 8.69542C9.51404 8.49998 9.50098 8.30139 9.4499 8.111C9.39882 7.92061 9.31072 7.74216 9.19062 7.58584C9.07053 7.42952 8.9208 7.29841 8.75 7.2Z'
        }
        fill={'black'}
      />
      <path
        d={
          'M6.16 11.26C5.91397 11.4261 5.72276 11.6615 5.61059 11.9364C5.49842 12.2112 5.47033 12.5132 5.52988 12.804C5.58943 13.0949 5.73393 13.3615 5.9451 13.5701C6.15627 13.7788 6.4246 13.9201 6.71612 13.9762C7.00765 14.0322 7.30925 14.0005 7.58275 13.8851C7.85624 13.7696 8.08933 13.5756 8.2525 13.3276C8.41567 13.0796 8.50158 12.7888 8.49935 12.4919C8.49713 12.195 8.40687 11.9055 8.24 11.66C8.13038 11.4963 7.98939 11.3561 7.82521 11.2472C7.66102 11.1384 7.47688 11.0632 7.28345 11.026C7.09002 10.9888 6.89114 10.9904 6.6983 11.0305C6.50546 11.0707 6.3225 11.1487 6.16 11.26Z'
        }
        fill={'black'}
      />
    </g>
    <defs>
      <clipPath id={'clip0_5661_2059'}>
        <rect fill={'white'} height={24} width={24} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
