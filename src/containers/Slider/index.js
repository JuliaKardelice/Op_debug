import { useEffect, useState, useMemo } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";


const Slider = () => {
  /* destructuration (on peut appeler l'error si il y en a ) */

  const { data } = useData(); 
  const [index, setIndex] = useState(0);

  /* Les dates ne sont bien classée */
  /* le UseMemo met en cache, applique effet seulement si modifications */

 const byDateDesc = useMemo(() =>
    // Sorting events by date in descending order (latest first)
    data?.focus.sort((evtA, evtB) =>
      new Date(evtB.date) - new Date(evtA.date)  // evtB comes before evtA if its date is more recent
    )
    , [data?.focus]);  // Dependency on data.focus to re-run only when data changes


useEffect(() => {
    // Logging current event id for testing previous .sort
    console.log(byDateDesc?.[index]?.id);
    // Auto update index every 5 seconds
    const interval = setInterval(() => {
      // Increment index and use modulo to loop back when reaching the end of the array
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
    }, 5000); // Slide changes every 5 seconds
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [byDateDesc, index]); // Dependency added on byDateDesc and index to ensure proper effect timing

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.id}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                {/* Creer une nouvelle instance à partir de Date */}
                <div>{getMonth(new Date(event.date))}</div> 
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((paginationEvent, radioIdx) => (
                <input
                  key={`${paginationEvent.id}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={()=>setIndex(radioIdx)}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
