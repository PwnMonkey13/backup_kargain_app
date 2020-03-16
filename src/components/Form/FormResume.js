import React, {memo, useContext, useEffect, useState} from 'react'
import styled from "styled-components";
import {FormContext} from '../../components/Context/FormContext';

const Aside = styled.aside`
        border: 1px solid #dce0e0;
        background-color: #f7f8f9;
        border-radius: .1875rem;
        background-color: #fff;
  `;

const Title = styled.div`
        margin-top: -1px;
        margin-right: -1px;
        margin-left: -1px;
        padding: .625rem 1.25rem;
        border-radius: .1875rem .1875rem 0 0;
        background-color: #27BE6F;
        color: #fff;
        font-size: 1.125rem;
        font-weight: bold;
        text-transform: uppercase;
  `;

const Content = styled.div`
        padding: 1.25rem;
    `;

const FormResume = memo(({stepChanges, props}) => {
    console.log(stepChanges);
    const {formDataContext, dispatchFormUpdate} = useContext(FormContext);
    const mapper = [
        {
            "manufacturer[make]" : "Marque",
            "manufacturer[model]" : "Modele",
            "manufacturer[generation]" : "Version",
            "manufacturer[year]" : "Année",
        }
    ];

    return (
        <Aside className="cell small-12 medium-4 large-3">
            <div className="box-bordered --alt-color --alt-padding price-details">
                <Title className="price-title">
                    <p className="--alt-margin">Votre annonce</p>
                </Title>
                <Content className="price-content">
                    { Object.keys(mapper).map(key => {
                        console.log(formDataContext[key]);
                        if(formDataContext[key]){
                            if(typeof formDataContext[key] === 'object'){
                                return(
                                    <div className="price-options">
                                        <div className="price-row align-middle">
                                            <span className="col">Fibres métalliques</span>
                                            <span className="icon-circle tiny hollow secondary price-action-delete">
                                                <i className="icon icon-delete"/>
                                            </span>
                                        </div>
                                    </div>
                                )
                            }
                            else{
                                return(
                                    <div className="price-row ">
                                        <div className="col shrink">Commune à livrer :</div>
                                        <div className="col shrink --strong location-name">MARSEILLE 7E ARRONDISSEMENT</div>
                                        <span className="small"><sup>3</sup></span>
                                    </div>
                                )
                            }
                        }
                    })}
                </Content>
            </div>
        </Aside>
    )
});

export default FormResume;
