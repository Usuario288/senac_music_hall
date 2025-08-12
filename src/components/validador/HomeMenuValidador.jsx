import React from 'react';
import AdminLayout from '../admin/AdminLayout';
import ValidadorIngresso from './ValidadorIngresso';
import AuthGuard from '../AuthGuard';

export default function HomeMenuValidador() {
    return (
        <AuthGuard roles={["Validador"]}>
            <AdminLayout>
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Painel do Validador
                </h1>
                <ValidadorIngresso />
            </AdminLayout>
        </AuthGuard>
    );
}