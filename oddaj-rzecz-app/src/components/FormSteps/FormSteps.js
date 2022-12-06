import {useState} from "react";
import {addDoc, collection} from "firebase/firestore"
import {datebase} from  "../../config/firebase"
import {useAuth} from "../../context/AuthContext";
import {FormOne} from "../FormOne/FormOne";
import {FormTwo} from "../FormTwo/FormTwo";
import {FormThree} from "../FormThree/FormThree";
import {FormFour} from "../FormFour/FormFour";
import {FormFive} from "../FormFive/FormFive";
import {FormBar} from "../FormBar/FormBar";
import {FormSix} from "../FormSix/FormSix";
import {ButtonNextPrevious} from "../ButtonNextPrevious/ButtonNextPrevious";
import './FormSteps.scss';

export function FormSteps() {
    const [step, setStep] = useState(1);
    const [formState, setFormState] = useState({
        type: '',
        bags: '',
        localization: '',
        helpGroups: '',
        localizationSpecific: '',
        street: '',
        city: '',
        postCode: '',
        phone: '',
        date: '',
        time: '',
        note: '',
    });
    const {currentUser} = useAuth()

    const formBarChange = () => {
        switch (step) {
            case 1:
                return <FormBar
                    header={'Ważne!'}
                    text={'Uzupełnij szczegóły dotyczące Twoich rzeczy. ' +
                        'Dzięki temu będziemy wiedzieć komu najlepiej je przekazać.'}
                />
            case 2:
                return <FormBar
                    header={'Ważne!'}
                    text={'Wszystkie rzeczy do oddania zapakuj w 60l worki. ' +
                        'Dokładną instrukcję jak poprawnie spakować rzeczy znajdziesz TUTAJ.'}
                />
            case 3:
                return <FormBar
                    header={'Ważne!'}
                    text={'Jeśli wiesz komu chcesz pomóc, możesz wpisać nazwę tej organizacji w wyszukiwarce. ' +
                        'Możesz też filtrować organizacje po ich lokalizacji bądź celu ich pomocy.'}
                />
            case 4:
                return <FormBar
                    header={'Ważne!'}
                    text={'Podaj adres oraz termin odbioru rzeczy.'}
                />
        }
    }

    const bttnChange = () => {
        return (
            <div className="FormSteps-content__btn">
                <ButtonNextPrevious
                    buttonText={'Wstecz'}
                    onClick={() => setStep(prev => prev - 1)}
                    disabled={step === 1}
                />
                <ButtonNextPrevious
                    buttonText={step === 5 ? 'Potwierdzam' : 'Dalej'}
                    onClick={() => setStep(prev => prev + 1)}
                    type={step === 5 ? 'submit' : null}
                    // type={'submit'}

                />
            </div>
        )
    }

    const formStepsChange = () => {
        if (step < 1) {
            setStep(1)
        } else if (step > 6) {
            setStep(6)
        }

        switch (step) {
            case 1:
                return <>
                    <FormOne formState={formState} setFormState={setFormState} />
                    {bttnChange()}
                </>;
            case 2:
                return <>
                    <FormTwo formState={formState} setFormState={setFormState}/>
                    {bttnChange()}
                </>;
            case 3:
                return <>
                    <FormThree formState={formState} setFormState={setFormState}/>
                    {bttnChange()}
                </>;
            case 4:
                return <>
                    <FormFour formState={formState} setFormState={setFormState}/>
                    {bttnChange()}
                </>;
            case 5:
                return <>
                    <FormFive formState={formState}/>
                    {bttnChange()}
                </>;
            case 6:
                return <FormSix setFormState={setFormState}/>
            default:
                return <>
                    <FormOne formState={formState} setFormState={setFormState}/>
                    {bttnChange()}
                </>;
        }
    }

    const formsRef = collection(datebase, "forms")

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addDoc(formsRef, {
            type: formState.type,
            bags: formState.bags,
            localization: formState.localization,
            helpGroups: formState.helpGroups,
            localizationSpecific: formState.localizationSpecific,
            street: formState.street,
            city: formState.city,
            postCode: formState.postCode,
            phone: formState.phone,
            date: formState.date,
            time: formState.time,
            note: formState.note,
            userEmail: currentUser.email,
            userId: currentUser.uid
        })
    }

    return (
        <div className="FormSteps">
            {formBarChange()}
            <div className="FormSteps-background"/>
            <form className="FormSteps-content" onSubmit={handleSubmit}>
                {formStepsChange()}
            </form>
        </div>
    )
}