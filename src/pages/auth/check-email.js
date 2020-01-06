import React from 'react'
import { useRouter } from 'next/router';
import Layout from '../../layouts/Layout'

export default (props) => {
    const router = useRouter();
    return () => {
        if (props.session.user) {
            return router.push('/auth/callback')
        } else{
            return(
              <Layout>
                  <div className="text-center pt-5 pb-5">
                      <h1 className="display-4">Check your email</h1>
                      <p className="lead">
                          A sign in link has been sent to
                          { (props.email)
                            ? <span className="font-weight-bold">{props.email}</span>
                            : <span>your inbox</span>
                          }.
                      </p>
                  </div>
              </Layout>
            );
        }
    }
}
