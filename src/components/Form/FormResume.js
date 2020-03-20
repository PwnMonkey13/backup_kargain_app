import React, {memo, useContext, useEffect, useState} from 'react'
import styled from "styled-components";

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
        padding: .25rem;
    `;

const FormResume = memo(({resumeModel, formValues, props}) => {

    return (
        <Aside className="cell small-12 medium-4 large-3">
            <div className="box-bordered --alt-color --alt-padding price-details">
                <Title className="price-title">
                    <p className="--alt-margin">Votre annonce</p>
                </Title>

                <Content className="price-content">
                    { resumeModel.map((stepLabels, index) => {
                        return(
                            <section key={index} className="resumeStep">
                                { Object.keys(stepLabels).map((key, index2) => {
                                    if(formValues[key]){
                                        return(
                                            <div key={index2} className="row">
                                                <div className="col">
                                                    <span className="col">{stepLabels[key]} : </span>
                                                </div>
                                                <div className="col shrink strong">
                                                    <span className="col">
                                                        {typeof formValues[key] === 'object' ? formValues[key].label : formValues[key] }
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    }

                                })}
                            </section>
                        )
                    })}
                </Content>
            </div>
        </Aside>
    )
});

export default FormResume;
