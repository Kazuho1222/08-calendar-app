import styled from "@emotion/styled";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import './App.css';

function App() {

  const StyleWrapper = styled.div`
  .fc-day-sat {
    background-color: #eaf4ff;
    color:red;
  }
  .fc-day-sun {
      background-color: #ffeaea;
      color:red;
  }
  `

  return (
    <StyleWrapper>
      <div>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth"
          headerToolbar={{ left: "prev", center: "title", right: "next" }}
        // businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
        />
      </div>
    </StyleWrapper>
  )
}

export default App
