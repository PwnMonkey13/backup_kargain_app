import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Col } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import PaginateResultsSituation from '../components/PaginateResultsSituation';
import PaginateResults from '../components/PaginateResults';
import searchServices from '../services/searchServices';
import User from '../models/user.model';
import AnnounceCardLight from '../components/AnnounceCardLight';

const SearchPage = ({ announces, users }) => {
    const { rows, total, page, size } = announces;
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-sm-4 col-xs-12 m-t-10">
                    <h6 className="nav-filters-title m-b-20 m-t-0">Membres</h6>
                    <div className="d-flex">
                        {users && users.map((userRaw, index) => {
                            const user = new User(userRaw);
                            return (
                                <div key={index}>
                                    <Link href={user.getProfileLink} prefetch={false}>
                                        <a className="decoration-none">
                                            <img className="img-profile-wrapper rounded-circle m-2"
                                                 src={user.getAvatar}
                                                 width={40}
                                                 alt=""
                                            />
                                            <Typography component="body1">
                                                {user.getFullName}
                                            </Typography>
                                        </a>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="col-md-9 col-sm-8 col-xs-12 wall">
                    <h6 className="nav-filters-title m-b-20 m-t-0">Annonces</h6>
                    <div className="row" id="results">
                        {announces.rows && announces.rows.map((announce, index) => (
                            <Col key={index} sm={12} md={12} lg={12} xl={6}>
                                <AnnounceCardLight
                                    announceRaw={announce}
                                    featuredImgHeight={200}
                                />
                            </Col>
                        ))}
                    </div>
                </div>
            </div>

            <PaginateResultsSituation
                count={rows.length}
                page={page}
            />
            <PaginateResults
                total={total}
                limit={size}
                pageCount={10}
                currentPage={page}
            />

        </div>
    );
};

export async function getServerSideProps (context) {
    try {
        const query = context.query.query;
        if (!query) throw 'err';

        const results = await searchServices.searchAPIResults(query);
        const { announces, users } = results;
        return {
            props: {
                query,
                announces,
                users,
            },
        };
    } catch (err) {
        return {
            props: {},
        };
    }
}

SearchPage.propTypes = {
    featuredImgHeight: PropTypes.number,
    announces: PropTypes.shape({
        rows: PropTypes.array,
    }),
};

SearchPage.defaultProps = {
    featuredImgHeight: 500,
};
export default SearchPage;
