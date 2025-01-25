import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";
import "./style.scss"

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); });

const Form = ({ onSuccess, onError }) => {
  // Initialisation des états avec useState
  const [sending, setSending] = useState(false); // Booléen pour savoir si le formulaire est en cours d'envoi
  const [formData, setFormData] = useState({
    nom: '',
    email: '', 
    prenom: '', 
    type: '',
    message: ''
  }); // Objet qui contient les valeurs des champs du formulaire

  const [errors, setErrors] = useState({}); // Objet qui contiendra les messages d'erreur pour chaque champ

  // Fonction pour réinitialiser le formulaire après l'envoi
  const resetForm = () => {
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      type: '',
      message: ''
    });
  };

  // Fonction qui gère les changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target; // Récupère le nom et la valeur du champ qui change
    setFormData((prevData) => ({
      ...prevData, // Copie les valeurs précédentes de formData
      [name]: value // Met à jour le champ en fonction du nom (name) du champ modifié
    }));
  };
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Fonction pour valider le formulaire
  const validateForm = () => {
    const newErrors = {}; // On crée un objet vide pour stocker les erreurs
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) { // Si un champ est vide
        newErrors[key] = "Ce champ est requis"; // On ajoute un message d'erreur correspondant
      }
    });
    setErrors(newErrors); // Met à jour l'état avec les erreurs
    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
  };

  // Fonction qui gère l'envoi du formulaire
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de page)

      // Valide le formulaire avant de l'envoyer
      if (!validateForm()) return; // Si la validation échoue, on arrête là

      setSending(true); // On indique que le formulaire est en cours d'envoi
      try {
        await mockContactApi(); // Simulation d'un appel API
        setSending(false); // Arrête l'indicateur de "sending"
        resetForm(); // Réinitialise le formulaire
        onSuccess(); // Appelle la fonction de succès si définie
      } catch (err) {
        setSending(false); // Arrête l'indicateur de "sending"
        onError(err); // Appelle la fonction d'erreur si une erreur survient
      }
    },
    [formData, onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field 
            placeholder="" 
            label="Nom" 
            name="nom" 
            value={formData.nom} // Le nom est récupéré de formData
            onChange={handleChange} // handleChange est appelé quand l'utilisateur modifie ce champ
            error={errors.nom} // Si une erreur est associée à ce champ, elle sera affichée
          />
          <Field 
            placeholder="" 
            label="Prénom" 
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            error={errors.prenom}
          />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={handleChange}
            label="Personel / Entreprise"
            name="type"
            type="large"
            value={formData.type}
            error={errors.type}
          />
          <Field 
            placeholder="" 
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            name="message"
            value={formData.message}
            type={FIELD_TYPES.TEXTAREA}
            onChange={handleChange}
            error={errors.message}
          />
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <div className="error-message">
          <p>Veuillez remplir tous les champs</p>
        </div>
      )}
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;