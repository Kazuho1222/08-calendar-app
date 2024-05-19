import { formatDistance, subDays } from 'date-fns';

export default function dateBar() {

  // const date = formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });

  return (
    <>
      <div>
        <button>前の月</button>
      </div>
      <div>
        {/* {date} */}
      </div>
      <div>
        <button>次の月</button>
      </div>
    </>
  )
}
