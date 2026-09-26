import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppHeader from "../../widgets/AppHeader/AppHeader.tsx";

export const MainLayout = () => {
  return (
    <>
      <AppHeader />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};