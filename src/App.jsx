import "./App.scss";
import Calendar from "./components/Calendar/Calendar";

const App = () => {
  return (
    <div className="calendarContainer">
      <h1>Calendar view</h1>
      <Calendar />
    </div>
  );
};

export default App;
