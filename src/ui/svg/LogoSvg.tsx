import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type LogoSvgProps = ComponentPropsWithoutRef<"svg"> & { size?: number };

export const LogoSvg = ({
  size = 600,
  color = "#076d74",
  ...props
}: LogoSvgProps) => {
  const viewBox = "0 0 174.8 172";
  return (
    <Link href={"/"}>
      <svg
        className={props.className}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={size}
        height={size}
        viewBox={viewBox}
        {...props}
      >
        <defs>
          <style>{`
      .st0 {
        fill: ${color};
      }
    `}</style>
        </defs>
        <g id="Layer_1">
          <g>
            <path
              className="st0"
              d="M72.4,61.7c1.1-.5,5-1.8,4.4-6.3,0-.1,0-.3,0-.4-1.2.3-2.1.6-2.7,1.1-1.4.9-1.7,2.2-1.8,3.3,0,.6,0,2.5.1,2.4"
            />
            <path
              className="st0"
              d="M96.6,77.6c.2,0,.1-1.6.1-2.1,0-1.5-.6-3.2-4-4-.8,4.3,2.9,5.6,3.9,6.1"
            />
            <path
              className="st0"
              d="M90.2,110.1c0-2.3-1.4-4.2-3.8-4.2h-2.6v8.3h2.7c2.3,0,3.8-1.9,3.8-4.1"
            />
            <path
              className="st0"
              d="M112.8,62.3l-5.1,2.7c0-.2,0-.5,0-.7l5.2-3.1v1.1h0ZM59.6,97.5l2.9.6-2.9,1.1v-1.7h0ZM68.1,49.2c-.2.1-.4.2-.5.3l-1.1-6.2c.2-.2.4-.4.6-.6l1,6.6h0ZM84.1,40.7l-1.6-5.8c1-.1,2-.2,3-.2l-1.4,6ZM87.3,34.7l-1.9,8.9c-.4,0-.7,0-1,0l2.1-9c.3,0,.5,0,.8,0M101.5,49.9c-.2-.2-.4-.4-.6-.6l3.6-7.3c.4.4.7.7,1.1,1.1l-4.1,6.9h0ZM104.1,53.4c0-.1-.2-.3-.2-.4h0l2-9.7c.4.5.8.9,1.2,1.4l-3,8.7h0ZM104.9,54.9c0-.1-.1-.2-.2-.4l3-8.9c.5.7,1,1.5,1.5,2.2l-4.3,7ZM107.2,53l2.5-4.1c.4.7.7,1.4,1,2.1l-3.5,2h0ZM105.5,55.9c0-.2-.2-.4-.3-.6l5.9-3.5c0,.3.2.5.3.8l-6,3.2ZM106,57.4c0-.2-.1-.4-.2-.6l5.9-3.2c0,.3.2.7.3,1l-5.9,2.8h0ZM106.5,58.9c0-.2-.1-.4-.2-.6l5.8-2.7c.1.7.2,1.4.3,2.1l-6,1.2h0ZM107.4,63.3c0-.1,0-.2,0-.3l5.2-4.7c0,.6,0,1.2.1,1.8l-5.3,3.2h0ZM107.4,96.8c0-.3,0-.5,0-.8l5.3-3.3v1l-5.3,3.1h0ZM107.3,99c0-.4,0-.7,0-1.1l5.4-3.1v.5l-5.4,3.6h0ZM109.8,98.6l3-2v1.2l-3,.8h0ZM109,99.8l3.8-1v1h-3.8ZM106,103.9c1.8,0,3.4.7,4.5,1.9l-1.1,1.3c-.8-.9-2.1-1.4-3.4-1.4-2.6,0-4.6,1.9-4.6,4.5s2.2,4.4,4.6,4.4,2.3-.4,3.1-1.1v-2.1h-1.5l-.7-1.7h3.9v4.5c-1.2,1.3-2.9,2.1-4.8,2.1-3.5,0-6.3-2.8-6.3-6.3s3-6,6.3-6M63.1,104.2h1.7v10h6.5v1.7h-8.2v-11.7h0ZM64.8,98.2c0,.6.1,1.1.1,1.6h-4.1l4-1.6ZM64.7,96.8c0,.3,0,.6,0,.8l-5.2-1.1v-.4l5.1.7h0ZM64.6,94.7c0,.4,0,.7,0,1.1l-5-.7v-.9l5,.5h0ZM64.4,89.7v.6l-4.8,3.2v-2.2l4.8-1.6h0ZM64.4,87.7v.9l-4.8,1.6v-.9l4.8-1.6ZM64.4,85.5c0,.4,0,.8,0,1.2l-4.8,1.6v-1.4l4.9-1.5h0ZM63.1,84.8l-3.5,1v-3.3l3.5,2.2ZM64.5,93.7l-3.1-.3,3-2c0,.8,0,1.6,0,2.3M64.5,83.4c0,.4,0,.7,0,1.1l-4.9-3.1v-1.1l5,3.1h0ZM64.7,81.5c0,.3,0,.6,0,.9l-5-3.2v-1.1l5.1,3.4h0ZM64.9,79.7c0,.2,0,.5,0,.7l-5.2-3.5v-1l5.3,3.9h0ZM65.7,75.4c-.3,1-.5,2.1-.7,3.2l-3.6-2.6,4.3-.5h0ZM63.7,74.7l-4.1.5v-3.2l4.1,2.6ZM65.9,74.8s0,0,0,.1l-6.3-4v-2.7l6.3,6.6h0ZM68,54.5l.4,3.1c-3.1,2-6.1,4.9-8.8,8.6v-5.2c0-2.3.3-4.5.8-6.5h7.6ZM61.9,53.1c-.1.1-.3.2-.4.3h-.8c.1-.4.2-.7.4-1.1l.9.8ZM63.7,51.9c-.4.2-.7.5-1,.7l-1.3-1.2c.1-.3.2-.5.3-.8l2,1.3h0ZM66,50.4l-.9-5.5c.2-.2.4-.5.5-.7l1,5.8c-.2.1-.4.3-.6.4M67.5,59.4c.3-.2.7-.5,1-.7l1.3,8.9c-.2.3-.5.6-.7.9l-1.6-9.1ZM65.8,60.8c.3-.3.6-.5.9-.7l1.6,9.6c-.1.2-.3.4-.4.6l-2.1-9.5h0ZM62.5,64.2c.8-.9,1.6-1.8,2.5-2.6l1.5,6.8-4-4.2h0ZM66.6,72.9c-.1.3-.2.6-.3.9l-6.2-6.5c.2-.3.4-.6.7-.9l5.9,6.5ZM61.3,65.6h0c.2-.2.4-.4.6-.7l5.7,6c-.1.2-.2.4-.3.5,0,.2-.2.3-.3.5l-5.7-6.4h0ZM85.9,58c-.6-.9-1.5-1.7-2.5-2.5.8.1,1.6.3,2.4.5l.2,2ZM93,60.7l.4,2.2c-.7-.2-1.3-.4-1.9-.6l1.5-1.6h0ZM92.5,58.8c.2.1.4.2.6.3l-2.7,2.9c-.2,0-.4-.1-.6-.2l2.8-3.1ZM91,58l.7.3-3,3.3c-.2,0-.5,0-.7-.1l3-3.5h0ZM86.8,56.3c.7.2,1.3.5,2,.7l-1.7,1.7-.2-2.4h0ZM89.7,57.4c.1,0,.2.1.4.2l-2.9,3.4c0,0,0-.2,0-.2,0-.2,0-.4-.2-.6l2.8-2.7h0ZM95,63.6c-.2,0-.4-.1-.6-.2l-.6-3.8c.4.2.7.4,1.1.7v3.4c.1,0,.1,0,.1,0ZM96.7,64.3c-.2-.1-.5-.2-.7-.3v-3.2c0,.1.3.3.5.4l.2,3.1h0ZM97.7,64.8l-.2-2.8c.2.2.4.3.7.5v2.6c0,0,0-.1-.2-.2,0,0-.1,0-.2-.1M102.6,66.4c.2.2.3.3.5.5l-1.2.2c-.1,0-.2-.1-.4-.2l1.1-.5h0ZM99.2,64.8v-1.5c.4.4.8.7,1.2,1l-1.2.4h0ZM101.2,65.1c.2.2.4.4.7.6l-1.4.6c-.3-.2-.7-.4-1-.5l1.7-.6ZM105.7,69.6c-.6-.4-1.5-1-2.6-1.7h.8c.7.6,1.3,1.2,1.8,1.7M106.8,59.8l3.4-.7-3,2.7c-.1-.7-.3-1.4-.4-2M102.2,50.7l1.8-3-.9,4.2c-.3-.4-.6-.8-.9-1.2M103.2,40.8c.2.2.4.3.6.5l-3.6,7.3c-.2-.1-.3-.3-.5-.4l3.5-7.4h0ZM98.3,37.6c.9.4,1.7.9,2.5,1.5l-2.2,4.9-.3-6.3ZM101.6,39.6l.8.6-3.5,7.4c-.2-.2-.4-.3-.6-.5l3.3-7.5h0ZM96.4,36.7c.3.1.6.3.9.4l.5,9.6c-.3-.2-.7-.4-1-.6l-.4-9.4h0ZM94.7,36c.2,0,.5.2.7.2l.4,9.2c-.2-.1-.4-.2-.6-.3l-.5-9.2h0ZM92.5,35.4c.4.1.8.2,1.2.3l.5,9c-.3-.1-.6-.2-1-.3l-.8-9h0ZM87,43.5h-.6l1.8-8.8c.3,0,.7,0,1,.1l-2.2,8.6h0ZM92.2,44.1c-.3,0-.7-.2-1-.2-.5-.1-1-.2-1.5-.2l2-5.2.5,5.7ZM88.7,43.5c-.2,0-.5,0-.7,0l2.2-8.6c.6,0,1.1.2,1.7.3l-3.2,8.3h0ZM72.9,46.8c-.7.3-1.3.6-1.9.9-.2.1-.5.2-.7.4v-5.3s2.7,4,2.7,4h0ZM74.7,46.1c-.3.1-.6.2-.8.3l-4.1-6.1c.2-.2.5-.4.7-.5l4.2,6.3h0ZM76,45.6c-.1,0-.3.1-.4.1l-4.4-6.5c.2-.1.5-.3.7-.4l4.1,6.8ZM79.7,44.4c-.3,0-.6.2-.9.2l-1.3-8.6c.3-.1.6-.2.9-.3l1.4,8.6ZM81,35.1c.1,0,.3,0,.4,0l2.5,8.6c-.5,0-1,.1-1.5.2l-1.4-8.7h0ZM81.4,44c-.3,0-.5.1-.8.2l-1.4-8.7c.3,0,.5-.1.8-.2l1.3,8.7h0ZM74.2,37.5c.7-.4,1.5-.7,2.3-1l.8,5.3-3.1-4.3h0ZM78.3,44.8c-.5.1-.9.3-1.4.4l-4.2-7c.2-.1.4-.2.6-.3l5,6.9h0ZM69,48.7l-1-6.9c.4-.4.9-.8,1.3-1.1v7.9c0,0-.2.1-.3.2M71.5,48.5c5.1-2.5,12.6-5.1,19.6-3.7,2.5.5,4.8,1.5,6.8,3.1h0c0,0,0,0,0,0,2.4,1.8,4.5,4.3,6.2,7.5,1.7,3.1,2.5,7.5,2.8,12.7h0c0,.5,0,1,0,1.5-1-1.2-4-4.5-8-7.6-.1-.1-.3-.2-.4-.3,0,0,0,0-.2-.1,0,0-.2-.1-.3-.2,0,0-.1-.1-.2-.1,0,0-.2-.1-.3-.2,0,0-.1-.1-.2-.2,0,0-.2-.1-.2-.2,0,0-.2-.1-.2-.2,0,0-.2-.1-.2-.2,0,0-.2-.1-.3-.2,0,0-.1-.1-.2-.1,0,0-.2-.1-.3-.2,0,0-.1,0-.2-.1-.1,0-.2-.1-.3-.2,0,0,0,0,0,0-.5-.3-.9-.6-1.4-.9h0c-.2,0-.3-.2-.5-.3,0,0,0,0,0,0-.2,0-.3-.2-.5-.2,0,0,0,0,0,0-.2,0-.3-.2-.5-.2,0,0,0,0,0,0-.2,0-.3-.2-.5-.2,0,0,0,0,0,0l-.5-.3s0,0,0,0c-.2,0-.4-.2-.6-.3h0c-2.8-1.3-5.9-2.2-9.1-2.5-.1.2-.2.4-.3.5l-.2.3s.1,0,.1.1c2.9,1.8,4.5,3.7,4.9,5.7,0,.1,0,.2,0,.3,0,.3,0,.6,0,1-.1,1.4-.8,2.8-2.1,4.3-4.1,4.9-5.3,12.1-5.5,13.9h-6s-1.8-12.6-1.8-12.6l-.2-1.3-1.2-8.5v-1c-.1,0-.6-3.5-.6-3.5h-5.7c.4-.3.9-.7,1.5-1.1h0s0,0,0,0c1.7-1.1,4-2.5,6.8-3.9M63,48.1c.4-.7.9-1.4,1.3-2.1l.5,3.1-1.8-1h0ZM65.6,50.6c-.4.2-.7.5-1,.7l-2.5-1.6c.1-.2.2-.5.4-.7l3.1,1.7h0ZM77.1,118h-.8v-16.2h.8v16.2ZM81.2,105.9l-.8-1.7h6c3.2,0,5.5,2.6,5.5,5.8s-.7,3.2-1.7,4.3c-1.1,1.1-2.2,1.5-3.7,1.5h-4.3v-10h-.9ZM96.1,118h-.8v-16.2h.8v16.2ZM66,99.8c0-.5-.1-1.2-.2-1.9h0s0,0,0,0c-.2-2.1-.4-5.2-.4-8.5h0,0v-1.9c0-.8,0-1.6,0-2.3h0,0c.2-5.9,1.1-10.4,2.7-13.2.6-1.1,1.2-2.1,1.9-3l1.8,12.5h7.7v-.6c0,0,.9-8.4,5.4-13.7,1.4-1.6,2.1-3.2,2.3-4.8,3.8.6,7.5,2,10.3,3.4,3.3,1.6,6,3.4,7.4,4.4h-5s-3.4,24.3-3.4,24.3h-5.3c-.2-1.7-1.3-8.1-4.9-12.6-1.5-1.8-2.1-3.4-1.8-5,.3-1.8,1.8-3.6,4.5-5.2l-.5-.8c-2.9,1.8-4.6,3.7-5,5.8-.3,1.9.4,3.8,2,5.8,4,4.8,4.8,12.3,4.8,12.3v.6h7.1l3.4-24.3h6.5c.2,6.5-.1,14.1-.5,22,0,2-.2,4.5-.3,6.6h0c0,.1-40.4.1-40.4.1h0ZM112.8,90.7v.9l-5.2,3.2c0-.3,0-.7,0-1l5.2-3.1ZM111.1,90.5l-3.5,2.1c0-.9,0-1.8.1-2.6l3.4.5h0ZM107.9,67.5c0-.5,0-.9-.1-1.4l5-2.6v.6l-4.9,3.4ZM109.4,67.6l3.4-2.4v3l-3.4-.6h0ZM108,69.2c0-.3,0-.5,0-.8l4.8.9v1.1l-4.8-1.1h0ZM108.1,71.1c0-.3,0-.6,0-1l4.7,1.1v.9l-4.7-1.1h0ZM108.1,72.9c0-.2,0-.5,0-.7l4.6,1.1v1.2l-4.6-1.6h0ZM108.2,73.9l3.1,1.1-3.1,1.7v-2.8M108.1,78.8c0-.3,0-.6,0-1l4.6-2.5v1l-4.6,2.5h0ZM108.1,80.8c0-.3,0-.6,0-.9l4.6-2.5v1l-4.7,2.4h0ZM108,83.1c0-.4,0-.8,0-1.2l4.7-2.4v1.1l-4.7,2.5h0ZM109.7,83.4l3.1-1.6v2.5l-3.1-.9h0ZM108,84.7c0-.3,0-.6,0-.8l4.8,1.4v.9l-4.8-1.4h0ZM112.8,88.9v.9l-5-.8c0-.5,0-1,0-1.5l4.9,1.4h0ZM107.9,86.5c0-.2,0-.5,0-.7l4.8,1.4v.8l-4.9-1.4h0ZM86.2,32.7c-15.7,0-28.5,12.7-28.5,28.3v58.8h57.1v-58.8c0-15.6-12.8-28.3-28.5-28.3"
            />
            <polygon
              className="st0"
              points="29.1 127.5 29.1 137.1 35.8 137.1 35.8 135.7 30.5 135.7 30.5 127.5 29.1 127.5"
            />
            <path
              className="st0"
              d="M43.1,135.7v1.3h-5.5v-6.7h5.2v1.3h-3.9v1.6c.6-.3,1.3-.4,2.1-.4h1v1.3h-1c-1.2,0-1.5,0-2.1.4v1h4.2Z"
            />
            <path
              className="st0"
              d="M47.9,131.5c-.6,0-1.4.3-1.4.7s.2.7,1.5.7c2.8,0,3.3,1,3.3,2,0,1.6-1.5,2.4-3.4,2.4s-2.3-.5-3-1.4l1-1c.4.4.9,1.1,2.1,1.1s2.1-.4,2.1-1.1-.7-.7-2.1-.7-2.8-.5-2.8-2,1.3-2,2.8-2,1.9.2,2.9.8l-.9,1c-.5-.4-1.2-.6-2-.6"
            />
            <path
              className="st0"
              d="M61.1,135.7c1.9,0,3.1-1.5,3.1-3.3s-1.1-3.5-3.1-3.5h-2.1v6.8h2.2,0ZM61,127.5c2.6,0,4.5,2.2,4.5,4.8s-.5,2.6-1.4,3.6c-.9.9-1.8,1.3-3.1,1.3h-3.5v-8.2h-.8l-.6-1.4h4.9,0Z"
            />
            <path
              className="st0"
              d="M73.4,135.7v1.3h-5.5v-6.7h5.2v1.3h-3.9v1.6c.6-.3,1.3-.4,2.1-.4h1v1.3h-1c-1.2,0-1.5,0-2.1.4v1h4.2Z"
            />
            <path
              className="st0"
              d="M75.7,134.5v-4.1h1.3v4.1c0,1.1.8,1.5,1.9,1.5s1.9-.4,1.9-1.5v-4.1h1.3v4.1c0,2-1.4,2.8-3.2,2.8h0c-1.9,0-3.2-.9-3.2-2.8"
            />
            <polygon
              className="st0"
              points="83.9 137.1 86.7 133.5 84.2 130.4 86.1 130.4 87.6 132.4 89.2 130.4 91 130.4 88.5 133.5 91.3 137.1 89.5 137.1 87.6 134.7 85.7 137.1 83.9 137.1"
            />
            <path
              className="st0"
              d="M101.4,128.6c-2.1,0-3.8,1.5-3.8,3.7s1.8,3.6,3.8,3.6,1.8-.4,2.5-.9v-1.8h-1.2l-.6-1.4h3.2v3.7c-1,1.1-2.4,1.7-3.9,1.7-2.9,0-5.2-2.3-5.2-5.2s2.4-4.9,5.2-4.9,2.8.6,3.7,1.5l-.9,1c-.7-.7-1.7-1.2-2.8-1.2"
            />
            <path
              className="st0"
              d="M112.8,132.4c0-.6-.5-.6-1-.6h-2.7v1.7c.5-.3,1.2-.4,1.9-.4h1.1c.4,0,.8-.2.8-.6M114.2,135.6h.5v1.4h-.6c-.7,0-1.3,0-1.9-1l-1-1.7h0c-1,0-1.3.1-1.9.4v2.3h-1.3v-6.7h4.3c1.2,0,2.1.9,2.1,2s-.6,1.6-1.5,1.9l.4.7c.3.5.8.6,1.1.6"
            />
            <rect
              className="st0"
              x="117.2"
              y="130.4"
              width="1.3"
              height="6.7"
            />
            <path
              className="st0"
              d="M123.9,131.5c-.6,0-1.3.3-1.3.7s.2.7,1.5.7c2.8,0,3.3,1,3.3,2,0,1.6-1.5,2.4-3.4,2.4s-2.3-.5-3-1.4l1-1c.4.4.9,1.1,2.1,1.1s2.1-.4,2.1-1.1-.7-.7-2.1-.7-2.8-.5-2.8-2,1.3-2,2.8-2,1.9.2,2.9.8l-.9,1c-.5-.4-1.2-.6-2-.6"
            />
            <path
              className="st0"
              d="M135.1,135.7v1.3h-5.5v-6.7h5.2v1.3h-3.9v1.6c.6-.3,1.3-.4,2.1-.4h1v1.3h-1c-1.2,0-1.5,0-2.1.4v1h4.2Z"
            />
            <path
              className="st0"
              d="M139.8,131.5c-.6,0-1.3.3-1.3.7s.2.7,1.5.7c2.8,0,3.3,1,3.3,2,0,1.6-1.5,2.4-3.4,2.4s-2.3-.5-3-1.4l1-1c.4.4.9,1.1,2.1,1.1s2.1-.4,2.1-1.1-.7-.7-2.1-.7-2.8-.5-2.8-2,1.3-2,2.8-2,1.9.2,2.9.8l-.9,1c-.5-.4-1.2-.6-2-.6"
            />
          </g>
        </g>
      </svg>
    </Link>
  );
};
