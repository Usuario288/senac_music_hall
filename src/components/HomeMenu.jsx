import React from 'react';
import AdminLayout from './admin/AdminLayout';
import AdminUser from './admin/AdminUser';
import CrudSetores from './admin/AdminSetores';
import CrudIngressos from './vendedor/CrudIngressos';
import CrudEventos from './admin/AdminEventos';

export default function HomeMenu() {
    return (
        <AdminLayout>
            <AdminUser />
            <CrudEventos />
            <CrudSetores />
            <CrudIngressos />
        </AdminLayout>
    );
}