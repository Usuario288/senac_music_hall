import React from 'react';
import AdminLayout from './AdminLayout';
import AdminUser from './AdminUser';
import CrudEventos from './AdminEventos';
import CrudIngressos from '../vendedor/CrudIngressos';
import CrudSetores from './AdminSetores';
import GraficoIngressos from './GraficoIngresso';
import CrudClientes from './CrudClientes';
import AuthGuard from '../AuthGuard';


export default function HomeMenu() {
    return (
        <AuthGuard roles={["Administrador"]}>
            <AdminLayout>
                <h1 className="azul_ocupacao_texto text-4xl font-semibold text-gray-800 mb-4 text-center">
                    Painel do Administrador
                </h1>
                <AdminUser />
                <CrudClientes />
                <CrudEventos />
                <CrudSetores />
                <CrudIngressos />
                <GraficoIngressos />
            </AdminLayout>
        </AuthGuard>
    );
}