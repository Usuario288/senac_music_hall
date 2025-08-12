import React from 'react';
import AdminLayout from '../admin/AdminLayout';
import CrudIngressos from './CrudIngressos';
import AuthGuard from '../AuthGuard';

export default function HomeMenuVendedor() {
    return (
        <AuthGuard roles={["Vendedor"]}>
            <AdminLayout>
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Painel do Vendedor
                </h1>
                <CrudIngressos />
            </AdminLayout>
        </AuthGuard>
    );
}