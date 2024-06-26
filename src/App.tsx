import '@fullcalendar/common/main.css';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { styled } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import interactionPlugin from "@fullcalendar/interaction"

// スタイル定義
const Cover = styled('div')(({
  opacity: 0,
  visibility: 'hidden',
  position: 'fixed',
  width: '100%',
  height: '100%',
  zIndex: 1000,
  top: 0,
  left: 0,
  background: 'rgba(0,0,0,0.3)',
  '&.inView': {
    opacity: 1,
    visibility: 'visible',
  },
}));

const Form = styled('div')(({
  opacity: 0,
  visibility: 'hidden',
  position: 'fixed',
  top: '30%',
  left: '40%',
  fontWeight: 'bold',
  background: 'rgba(255,255,255)',
  width: '400px',
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2000,
  '&.inView': {
    opacity: 1,
    visibility: 'visible',
  },
}));

const StyleWrapper = styled('div')`
  .fc-day-sat {
    background-color: #eaf4ff;
    color: red;
  }
  .fc-day-sun {
    background-color: #ffeaea;
    color: red;
  }
`;

interface MyEventsType {
  id: number;
  title: string;
  start: string;
}

function App() {
  const ref = useRef<FullCalendar>(null);
  const [inputTitle, setInputTitle] = useState('');
  const [inView, setInView] = useState(false);
  const [myEvents, setMyEvents] = useState<MyEventsType[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<MyEventsType | null>(null);

  const handleClick = (info: any) => {
    const event = myEvents.find(event => event.id === parseInt(info.event.id));
    if (event) {
      setInputTitle(event.title);
      setSelectedDate(event.start);
      setEditingEvent(event);
      setInView(true);
    }
  };

  const handleSelect = (selectInfo: any) => {
    setInputTitle('');
    setSelectedDate(selectInfo.startStr);
    setEditingEvent(null);
    setInView(true);
  };

  const onAddEvent = () => {
    if (selectedDate) {
      if (editingEvent) {
        const updatedEvents = myEvents.map(event => event.id === editingEvent.id
          ? { ...event, title: inputTitle, start: selectedDate }
          : event
        );
        setMyEvents(updatedEvents);
        const eventApi = ref.current?.getApi().getEventById(editingEvent.id.toString());
        if (eventApi) {
          eventApi.setProp('title', inputTitle);
          eventApi.setStart(selectedDate);
        }
      } else {
        const newEvent: MyEvensType = {
          id: myEvents.length,
          title: inputTitle,
          start: selectedDate,
        };
        setMyEvents([...myEvents, newEvent]);
        if (ref.current) {
          ref.current.getApi().addEvent({
            id: newEvent.id.toString(),
            title: newEvent.title,
            start: newEvent.start,
          });
        }
      }
      setInView(false);
    }
  };

  const onDeleteEvent = () => {
    if (editingEvent) {
      const updatedEvents = myEvents.filter(event => event.id !== editingEvent.id);
      setMyEvents(updatedEvents);
      const eventApi = ref.current?.getApi().getEventById(editingEvent.id.toString());
      if (eventApi) {
        eventApi.remove();
      }
      setInView(false);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await fetch('/api/events').then(res => res.json());
      setMyEvents(events);
    };

    fetchEvents();
  }, []);

  const coverElement = (
    <Cover
      onClick={() => setInView(false)}
      className={inView ? 'inView' : ''}
    />
  );

  const titleElement = (
    <div>
      <label>タイトル</label>
      <input
        type="text"
        value={inputTitle}
        name="inputTitle"
        onChange={(e) => setInputTitle(e.target.value)}
      />
    </div>
  );

  const btnElement = (
    <div>
      <input type="button" value="保存" onClick={onAddEvent} />
      {editingEvent && <input type="button" value="削除" onClick={onDeleteEvent} />}
      <input
        type="button"
        value="閉じる"
        onClick={() => setInView(false)}
      />
    </div>
  );

  const formElement = (
    <Form className={inView ? 'inView' : ''}>
      <form>
        <div>予定を入力</div>
        {titleElement}
        {btnElement}
      </form>
    </Form>
  );

  return (
    <StyleWrapper>
      <div>
        {coverElement}
        {formElement}
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{ left: 'prev', center: 'title', right: 'next' }}
          ref={ref}
          eventClick={handleClick}
          selectable={true}
          select={handleSelect}
          events={myEvents}
          selectAllow={() => true}
        />
      </div>
    </StyleWrapper>
  );
}

export default App;
