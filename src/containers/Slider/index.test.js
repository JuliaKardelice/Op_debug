import { fireEvent, getAllByRole, render, screen } from "@testing-library/react";
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






describe.skip('When the slider component is created', () => {
  it('should display radio-button', () => {
    render(<Slider />);
    const radioButtons = screen.getAllByRole("radio") /// cela ne marche pas utiliser date-test-id ????

    expect (radioButtons).toBeInTheDocument()
 
  });
  it.skip('it an onChange callback is called to change the current slide')
  const onChange = jest.fn(); /// doit utiliser le set index
  render (<Slider />)

  fireEvent(
  radioButtons,
  new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
  })
  )
  expect (onChange).toHaveBeenCalled()

});