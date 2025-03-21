import { fireEvent, render, screen } from "@testing-library/react";
import Select from "../components/Select";
import EventList from "../containers/Events";




describe.skip("When a user selects an event category", () => {
  it("the Event component should display the filtered events", () => {
    // Rendre les deux composants ensemble et voir si ils fonctionnent entre eux
    render(
      <>
        <Select />
        <EventList />
      </>
    );

    const selectElement = screen.getByTestId("select-testid");
    fireEvent.change(selectElement, { target: { value: "Conférence, Conférence Digitale" } });

    // Vérifier que le composant Event affiche les événements conférence
    const conferenceEvent = screen.getByText("");
    const digitalEvent = screen.queryByText("Art Gallery");

    // On s'attend à ce que l'événement musical soit visible
    expect(conferenceEvent).toBeInTheDocument();

    expect(digitalEvent).not.toBeInTheDocument();
  });
}); 