import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import './App.css'
import styled from "@emotion/styled";

function App() {

  const StyleWrapper = styled.div`
  .fc .fc-prev-button{
  }

  .fc .fc-next-button{
  }
  `

  return (
    <StyleWrapper>
      <div>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth"
          headerToolbar={{ left: "prev", center: "title", right: "next" }} />
      </div>
    </StyleWrapper>
  )
}

export default App
