import React from 'react'
import CustomerPage from '../Pages/CustomerPage'
import InteractionPage from '../Pages/InteractionPage'
import {Routes, Route} from "react-router-dom"
import ContactsPage from "../Pages/ContactsPage"

function RoutingPage() {
  return (
    <>
    <Routes>
        <Route path="/" element={<CustomerPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/interaction" element={<InteractionPage />} />
    </Routes>
    </>
  )
}

export default RoutingPage