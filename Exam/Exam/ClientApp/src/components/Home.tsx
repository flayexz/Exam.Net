import React from 'react';
import axios from "axios";
import {CreditInfoDto} from "../Dto/CreditInfoDto";
import ValidationInput from "./ValidationInput";
import {maxLength, maxValue, minValue, pattern, required} from "../validations/validations";
import useForm from "../hook/form/useForm";
import {CreditGoalDto} from "../Dto/CreditGoalDto";
import {PledgeDto} from "../Dto/PledgeDto";
import {EmploymentDto} from "../Dto/EmploymentDto";

export function Home() {
    
    const form = useForm<CreditInfoDto>({
        passport: {serial: '', number: '', issuedBy: '', registration: '', issuedDate: new Date()},
        person: {fullName: {firstName: '', secondName: '', patronymic: null}, age: 0},
        creditGoal: CreditGoalDto.consumer,
        pledge: PledgeDto.guarantee,
        employment: EmploymentDto.contract,
        isCriminalRecorded: false,
        creditAmount: 0,
        hasAnyCredits: false
    })

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if(form.isValid){
            axios.post("credit",form.form.current).then(r => {
                let verifyText = r.data.isVerified ? `your credit is successfully verified! Score : ${r.data.score}` 
                    : `your credit was rejected! Score: ${r.data.score}`
                alert(verifyText);
            })
        }
        else{
            return;
        }
    }
    
    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Fast-credit</h1>
            <div className="d-flex flex-column">
                <form>
                    <div className="mt-2">
                        <ValidationInput initialValue={''} validations={[maxLength(50), required]}
                                         name={'First name'}
                                         formInfo={form}
                                         setFieldForm={(form, value) => form.person.fullName.firstName = value}
                                         typeInput="text"
                                         isRequired={true}/>
                    </div>
                    <div className="mt-2">
                        <ValidationInput initialValue={''} validations={[maxLength(50), required]}
                                         name={'Second name'}
                                         formInfo={form}
                                         setFieldForm={(form, value) => form.person.fullName.secondName = value}
                                         typeInput="text"
                                         isRequired={true}/>
                    </div>
                    <div className="mt-2">
                        <ValidationInput initialValue={''} validations={[maxLength(50)]}
                                         name={'Patronymic'}
                                         formInfo={form}
                                         setFieldForm={(form, value) => form.person.fullName.patronymic = value}
                                         typeInput="text"
                                         isRequired={false}/>
                    </div>
                    <div className="mt-2">
                        <ValidationInput initialValue={0} validations={[minValue(21),maxValue(72)]}
                                         name={'Age'}
                                         formInfo={form}
                                         setFieldForm={(form, value) => form.person.age = +value}
                                         typeInput="number"
                                         isRequired={true}/>
                    </div>
                    <div className="mt-2">
                        <ValidationInput initialValue={''} validations={[pattern(/^[0-9]{4}$/, '4 numbers'), required]}
                                         name={'Passport serial'}
                                         formInfo={form}
                                         setFieldForm={(form, value) => form.passport.serial = value}
                                         typeInput="text"
                                         isRequired={true}/>
                    </div>

                    <div className="mt-2">
                        <ValidationInput initialValue={''} validations={[pattern(/^[0-9]{6}$/, '6 numbers'), required]}
                                         name={'Passport number'}
                                         formInfo={form}
                                         setFieldForm={(form, value) => form.passport.number = value}
                                         typeInput="text"
                                         isRequired={true}/>
                    </div>

                    <div className="mt-2">
                        <ValidationInput initialValue={''} validations={[maxLength(200), required]}
                                         name={'Issued by'}
                                         formInfo={form}
                                         setFieldForm={(form, value) => form.passport.issuedBy = value}
                                         typeInput="text"
                                         isRequired={true}/>
                    </div>

                    <div className="mt-2">
                        <ValidationInput initialValue={''} validations={[maxLength(200), required]}
                                         name={'Registration'}
                                         formInfo={form}
                                         setFieldForm={(form, value) => form.passport.registration = value}
                                         typeInput="text"
                                         isRequired={true}/>
                    </div>
                    <div className="mt-2">
                        <ValidationInput initialValue={''} validations={[{
                            valueIsValid: value => new Date() >= new Date(value), 
                            errorMessage: 'input correct date'
                        }]}
                                         name={'issued date'}
                                         formInfo={form}
                                         setFieldForm={(form, value) => form.passport.issuedDate = new Date(value)}
                                         typeInput="date"
                                         isRequired={true}/>
                    </div>
                    <div className="mt-2">
                        <ValidationInput initialValue={''} validations={[]} name={'Has other Credits'} 
                                         formInfo={form} 
                                         setFieldForm={(form, value) => form.hasAnyCredits } 
                                         typeInput="checkbox" isRequired={false}/>
                    </div>
                    <div className="mt-2">
                        <ValidationInput initialValue={''} validations={[]} name={'Was judged'}
                                         formInfo={form}
                                         setFieldForm={(form, value) => form.isCriminalRecorded }
                                         typeInput="checkbox" isRequired={false}/>
                    </div>
                    <div className="mt-2">
                        <div>Employment</div>
                        <select className="form-select" onChange={event => form.form.current.employment = Number(event.target.value)}>
                            <option value={EmploymentDto.contract}>Contract</option>
                            <option value={EmploymentDto.individualEntrepreneur}>Individual entrepreneur</option>
                            <option value={EmploymentDto.freelancer}>freelancer</option>
                            <option value={EmploymentDto.pensioner}>pensioner</option>
                            <option value={EmploymentDto.unemployed}>Unemployed</option>
                        </select>
                    </div>
                    <div className="mt-2">
                        <div>Pledge</div>
                        <select className="form-select" onChange={event => form.form.current.pledge = Number(event.target.value)}>
                            <option value={PledgeDto.realEstate}>Real estate</option>
                            <option value={PledgeDto.newCar}>new car (car age is less than 3)</option>
                            <option value={PledgeDto.oldCar}>old car (car age is more than 3)</option>
                            <option value={PledgeDto.guarantee}>Guarantee</option>
                            <option value={PledgeDto.none}>None</option>
                        </select>
                    </div>
                    <div className="mt-2">
                        <div>Credit go</div>
                        <select className="form-select" onChange={event => form.form.current.creditGoal = Number(event.target.value)}>
                            <option value={CreditGoalDto.consumer}>Consumer</option>
                            <option value={CreditGoalDto.realEstate}>Real extate</option>
                            <option value={CreditGoalDto.onLending}>On lending</option>
                        </select>
                    </div>
                    <div className="mt-2">
                        <ValidationInput initialValue={0} validations={[minValue(0), maxValue(1000000000)]}
                                         name={'Credit amount'}
                                         formInfo={form}
                                         setFieldForm={(form, value) => form.creditAmount = +value}
                                         typeInput="number"
                                         isRequired={true}/>
                    </div>
                    <input type="button" className="mt-2 btn btn-primary" value="Go" onClick={(e) => onSubmit(e)} disabled={!form.isValid} />
                </form>
            </div>
        </div>
    )
}