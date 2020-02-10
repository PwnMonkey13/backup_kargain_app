import React from 'react';
import Link from "next/link";

const AnnounceCard = ({ announce, ...props}) => {

    const getFullNameAuthor = () => {
        return (
            <p>
                {announce.author.user_firstname.toUpperCase()} { announce.author.user_lastname.toUpperCase() }
            </p>
        )
    };

    const displayEl = (val) => {
        if(typeof val === "object"){
            if(Array.isArray(val)){
                return(
                    <ul>
                        { val.map((sub, index) => {
                                return(
                                    <li key={index}>
                                        <p>{sub}</p>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                )
            } else{
                return(
                    <ul>
                        { Object.entries(val).map(([key, sub]) => {
                                return(
                                    <li key={key}>
                                        <p>{sub}</p>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                )
            }
        } else return <p> { val } </p>
    };

    const FormResume = () => {
        return(
            <table>
                <tbody>
                    { Object.entries(announce).map(([key, val], index) => (
                        <tr key={index}>
                            <td>{key}</td>
                            <td>{displayEl(val)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    };

    const Legacy = () => {
        return (
            <div className="objava-wrapper">
                <div className="top-profile-wrapper">
                    <a href="#">
                        <img src="images/profile.png" alt="" className="img-profile-wrapper"/>
                    </a>
                    <div className="top-profile-content-wrapper-pre">
                        <div className="top-profile-content-wrapper">
                            <h2> { } </h2>
                            <div className="top-profile-name-btn">
                                <Link href={`/user`}>
                                    <a className="top-profile-name">
                                        {/*{ getFullNameAuthor() }*/}
                                    </a>
                                </Link>
                            </div>
                            <div className="top-profile-data-wrapper">
                                <a href="#" className="top-profile-location">
                                    <img src="images/location.png" alt=""/>
                                    Paris 75005, France</a>
                            </div>
                        </div>
                        <div className="share">il y a 6 heures
                            <img src="images/share.png" alt=""
                                 data-toggle="modal"
                                 data-target="#exampleModalCenter2"/>
                        </div>
                    </div>
                </div>
                <div className="annonce-slider3">
                    <div>
                        <a href="#"><img src="images/slider1.png" alt=""/></a>
                    </div>
                </div>
                <div className="price-stars-wrapper">
                    <div className="icons-profile-wrapper">
                        <div className="icons-star-prof icons-star-current">
                            <img src="images/star.svg" alt=""/>
                            <span>15</span>
                        </div>
                        <a href="#" className="icons-star-prof">
                            <img src="images/comment.svg" alt=""/>
                            <span>7</span>
                        </a>
                        <a href="#" className="icons-star-prof icons-star-prof-convert">
                            <img src="images/convert.svg" alt=""/>
                        </a>
                    </div>
                    <p className="price-annonce">20 000 €TTC <span>16 000 €HT</span></p>
                </div>
                <h1 className="annonce">Marque | modèle | 2001 | 50 000km | Essence</h1>
                <p className="hashes-wrapper">
                    <a href="#">#hashtag</a>
                    <a href="#">#hashtag</a>
                    <a href="#">#hashtag</a>
                    <a href="#">#hashtag</a>
                    <a href="#">#hashtag</a>
                    <a href="#">#hashtag</a>
                </p>
                <div className="questions-prof-wrapper">
                    <p className="qusetion-wrapper"><span><a href="#">prestigcars</a></span> je reserve</p>
                    <p className="qusetion-wrapper"><span><a href="#">prestigcars</a></span> je reserve</p>
                    <p className="qusetion-wrapper"><span><a href="#">prestigcars</a></span> je reserve</p>
                    <p className="qusetion-wrapper"><span><a href="#">prestigcars</a></span> je reserve</p>
                    <p className="qusetion-wrapper"><span><a href="#">prestigcars</a></span> je reserve</p>
                    <p className="qusetion-wrapper"><span><a href="#">prestigcars</a></span> je reserve</p>
                </div>
                <form action="#">
                    <textarea className="add-comment" placeholder="Ajouter un commentaire..."/>
                </form>
                <a href="#" className="btn btn-primary btn-publier">Plus d’infos</a>
            </div>
        );
    };

    return(
        <div className="announce">
            <FormResume/>
        </div>
    )
};

export default AnnounceCard;
