import React, { useEffect, useState } from 'react'
import UsersService from '../../../services/UsersService'
import ReactTablePaginate from './ReactTablePaginate'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

const UsersTable = () => {
    const router = useRouter();
    const [resultFetch, setResultsFetch] = React.useState({ rows : [] })
    const [loading, setLoading] = useState(false)
    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(2)
    const [pageCount, setPageCount] = useState(0);

    const columns = React.useMemo(() => [
            {
                Header: 'First Name',
                accessor: 'firstname',
            },
            {
                Header: 'Last Name',
                accessor: 'lastname',
            },
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },

            {
                Header: 'Email validé',
                accessor: d => d.email_validated ? "Yes" : "No"
            },
            {
                Header: 'Nombre d`\'annnonces',
                accessor: d => d.ads ? d.ads.length : 0
            },
        ], [])

    const fetchData = React.useCallback((fetchProps) => {
        const { pageSize, pageIndex } = fetchProps;
        console.log(fetchProps)
        setLoading(true)
        setPageSize(pageSize)
        setPageIndex(pageIndex);

        UsersService.getUsers({size : pageSize, page : pageIndex })
            .then(data => {
                console.log(data)
                setResultsFetch(data)
                setPageCount(data.pages)
                setLoading(false)
            })
    }, [])

    const handleItemClickEdit = (index) => {
        const user = resultFetch.rows[index];
        if(user) router.push(`/admin/users/${user.username}`)
        else console.log("not found");
    };

    const handleItemClickDelete = (index) => {
        console.log(index);
    };

    return (
        <Styles>
            <ReactTablePaginate
                enableDebug
                columns={columns}
                data={resultFetch.rows}
                fetchData={fetchData}
                loading={loading}
                pageCount={pageCount}
                //custom
                totalIndicator={resultFetch.total}
                paginationDefaultConfig={{ pageIndex, pageSize}}
                handleItemClickEdit={handleItemClickEdit}
                handleItemClickDelete={handleItemClickDelete}
            />
        </Styles>
    )
}

export default UsersTable
