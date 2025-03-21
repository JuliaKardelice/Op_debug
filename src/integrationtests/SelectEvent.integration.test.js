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
<<<<<<< HEAD

=======
>>>>>>> 8dd82c20743b8f1410173f3835af79e504f019a4
    const selectElement = screen.getByTestId("select-testid");
    fireEvent.change(selectElement, { target: { value: "Conférence, Conférence Digitale" } });

    // Vérifier que le composant Event affiche les événements conférence
    const conferenceEvent = screen.getByText("");
<<<<<<< HEAD
    const digitalEvent = screen.queryByText("Art Gallery");
=======
    const digitalEvent = screen.queryByText("");
>>>>>>> 8dd82c20743b8f1410173f3835af79e504f019a4

    // On s'attend à ce que l'événement musical soit visible
    expect(conferenceEvent).toBeInTheDocument();

    expect(digitalEvent).not.toBeInTheDocument();
  });
}); 