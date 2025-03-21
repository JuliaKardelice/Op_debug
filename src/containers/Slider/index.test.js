import { render, fireEvent, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });
});



describe.skip("Radio buttons work correctly in the slider", () => {

  // vérifier que les boutons s'affichent
  it("should display radio buttons", () => {
    // On rend le composant dans l'environnement de test
    render(
      <Slider options={["Slide 1", "Slide 2", "Slide 3"]} />
    );

  
    const radioButton = screen.getByTestId('radio-idx-1');
    // Vérifie qu'il est bien dans le DOM
    expect(radioButton).toBeInTheDocument();
  });
});

  /* Deuxième test : vérifier que cliquer sur un bouton change de slide
   it("should trigger a change of slides when the radio button is clicked", () => {
    // Simule une fonction callback (comme une fonction onChange)
    const onChange = jest.fn();

    // Rendre le composant avec la fonction onChange simulée
    render(
      <Slider options={["Slide 1", "Slide 2", "Slide 3"]} onChange={onChange} />
    );

    // Sélectionne le deuxième bouton radio
    const radioButton = screen.getByTestId('radio-idx-1');

    // Simule un clic sur le bouton radio
    fireEvent.click(radioButton);

    // Vérifie que la fonction onChange a bien été appelée
    expect(onChange).toHaveBeenCalled();
  }); */


  