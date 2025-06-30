import { SquareLoader } from "react-spinners";

export default function LoadingView() {
  return(
    <div>
      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 dark:bg-black">
        <SquareLoader color="#94a3b8"/>
        <p className='text-sm dark:text-gray-200'>loading...</p>
      </div>
    </div>
  )
}