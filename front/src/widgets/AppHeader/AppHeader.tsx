import { Box, Container, Toolbar, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { AppRoutes } from "../../routing/routes.ts";

const AppHeader = () => {

  return (
    <Box component="header" sx={{mb: 2, borderBottom: '1px solid #fff'}} >
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <Typography
            variant="h4"
            component={Link}
            to={AppRoutes.main}
            sx={{textDecoration: 'none', color: 'inherit', fontWeight: 'bold'}}
          >
            InfoForum
          </Typography>

          {/*<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>*/}
          {/*  {user ? (*/}
          {/*    <>*/}
          {/*      <Typography variant="body1">Hello, {user.username}!</Typography>*/}
          {/*      <Button component={Link} to={AppRoutes.trackHistory} color="inherit">*/}
          {/*        Track History*/}
          {/*      </Button>*/}
          {/*      <Button color="inherit" onClick={() => dispatch(unsetUser())}>*/}
          {/*        Logout*/}
          {/*      </Button>*/}
          {/*    </>*/}
          {/*  ) : (*/}
          {/*    <>*/}
          {/*      <Button component={Link} to={AppRoutes.login} color="inherit">*/}
          {/*        Sign In*/}
          {/*      </Button>*/}
          {/*      <Button component={Link} to={AppRoutes.register} color="inherit">*/}
          {/*        Sign Up*/}
          {/*      </Button>*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*</Box>*/}
        </Toolbar>
      </Container>
    </Box>
  );
};

export default AppHeader;