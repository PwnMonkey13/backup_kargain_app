import React, { memo } from 'react';
import PropTypes from 'prop-types';

const PaginateResultsSituation = memo(({count, page}) => {
    if (page > 1) count += page * props.size;
    return (
        count ? <p className="py-2 text-center">{count} announces sur {count} </p> : null
    );
});

export default PaginateResultsSituation

PaginateResultsSituation.propsType = {
    count : PropTypes.number.isRequired,
    page : PropTypes.number.isRequired
}
