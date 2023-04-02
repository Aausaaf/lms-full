import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useNavigate } from 'react-router-dom';

import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components

import QuizListHead from '../sections/@dashboard/quiz/QuizListHead';
import QuizListToolbar from '../sections/@dashboard/quiz/QuizListToolbar';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
// import { AssignmentListHead, AssignmentListToolbar } from '../sections/@dashboard/assignment'
// mock
import QuizList from '../_mock/quiz';
import { UnPublishedQuizs } from '../_mock/unpublishedQuiz';
import { Role } from '../env';
import { useQuizContext } from 'src/ApiIntegration/quiz';
import { useEffect } from 'react';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Quiz List', alignRight: false },
  { id: '', label: "", alignRight: false },
  { id: '', label: '', alignRight: false },
  { id: '', label: '', alignRight: false },
  { id: '', label: '', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function    
                                                                                                                                                                                                                                                                                                   UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(8);

  const navigate = useNavigate()

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = QuizList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - QuizList.length) : 0;
  const {quizsData,getQuizData} = useQuizContext()
  const filteredUsers = applySortFilter(quizsData, getComparator(order, orderBy), filterName);
  const filteredquiz = applySortFilter(UnPublishedQuizs, getComparator(order, orderBy), filterName);
 
  const isNotFound = !filteredUsers.length && !!filterName;

  useEffect(()=>{
    getQuizData()
  },[])

  return (
    <>
      <Helmet>
        <title> Quiz | TG </title>
      </Helmet>

      <Container style={{
        maxWidth:"1800px"
      }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Quizzes
          </Typography>
          {
            Role === "Teacher" || Role == "admin" ? <Button onClick={()=>{
              navigate('/dashboard/addquiz')
            }} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Add Quiz
            </Button>  : ""
          }
        </Stack>

        <Card>
          <QuizListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <QuizListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={QuizList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                    const { id, title, role, status, company, avatarUrl, isVerified } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow onClick={()=>{
                        navigate(`/dashboard/perticularquiz/${index}`)
                      }} style={{
                        cursor:"pointer"
                      }} hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell  padding="checkbox">
                          {/* <Checkbox disabled checked={selectedUser} onChange={(event) => handleClick(event, name)} /> */}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 15q.425 0 .738-.313t.312-.737q0-.425-.313-.737T14 12.9q-.425 0-.738.313t-.312.737q0 .425.313.738T14 15Zm-.75-3.2h1.5q0-.725.15-1.063t.7-.887q.75-.75 1-1.212t.25-1.088q0-1.125-.788-1.837T14 5q-1.025 0-1.788.575T11.15 7.1l1.35.55q.225-.625.613-.938T14 6.4q.6 0 .975.338t.375.912q0 .35-.2.663t-.7.787q-.825.725-1.012 1.137T13.25 11.8ZM8 18q-.825 0-1.413-.588T6 16V4q0-.825.588-1.413T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.588 1.413T20 18H8Zm-4 4q-.825 0-1.413-.588T2 20V6h2v14h14v2H4Z"/></svg>

                            <Typography variant="subtitle2" noWrap>
                              {title}
                            </Typography>
                          </Stack>
                        </TableCell>

                        {/* <TableCell align="left">{company}</TableCell> */}
                        <TableCell align="left">{""}</TableCell> 
                        {/* <TableCell align="left">{role}</TableCell> */}
                        <TableCell align="left">{""}</TableCell>
                        {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}
                        <TableCell align="left">{""}</TableCell>
                        {/* <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell> */}
                   <TableCell align="left">
                      {""}
                        </TableCell>
                        <TableCell align="right">
                          {/* <IconButton size="large" color="inherit" onClick={handleOpenMenu}> */}
                          <IconButton size="large" color="inherit">
                            {/* <Iconify icon={'eva:more-vertical-fill'} /> */}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[8, 10, 20]}
            component="div"
            count={QuizList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

       {
        Role === "Teacher" ? <>
        <br />
        <br />
        <br />
        <br />
























       <Typography variant="h4" gutterBottom>
       Unpublished Quizes
         </Typography>
  <br />
       <Card>
         <QuizListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

         <Scrollbar>
           <TableContainer sx={{ minWidth: 800 }}>
             <Table>
               <QuizListHead
                 order={order}
                 orderBy={orderBy}
                 headLabel={TABLE_HEAD}
                 rowCount={QuizList.length}
                 numSelected={selected.length}
                 onRequestSort={handleRequestSort}
                 onSelectAllClick={handleSelectAllClick}
               />
               <TableBody>
                 {filteredquiz.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                   const { id, name, role, status, company, avatarUrl, isVerified } = row;
                   const selectedUser = selected.indexOf(name) !== -1;

                   return (
                     <TableRow  style={{
                       cursor:"pointer"
                     }} hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                       <TableCell  padding="checkbox">
                         {/* <Checkbox disabled checked={selectedUser} onChange={(event) => handleClick(event, name)} /> */}
                       </TableCell>

                       <TableCell component="th" scope="row" padding="none">
                         <Stack direction="row" alignItems="center" spacing={2}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 15q.425 0 .738-.313t.312-.737q0-.425-.313-.737T14 12.9q-.425 0-.738.313t-.312.737q0 .425.313.738T14 15Zm-.75-3.2h1.5q0-.725.15-1.063t.7-.887q.75-.75 1-1.212t.25-1.088q0-1.125-.788-1.837T14 5q-1.025 0-1.788.575T11.15 7.1l1.35.55q.225-.625.613-.938T14 6.4q.6 0 .975.338t.375.912q0 .35-.2.663t-.7.787q-.825.725-1.012 1.137T13.25 11.8ZM8 18q-.825 0-1.413-.588T6 16V4q0-.825.588-1.413T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.588 1.413T20 18H8Zm-4 4q-.825 0-1.413-.588T2 20V6h2v14h14v2H4Z"/></svg>

                           <Typography onClick={()=>{
                       navigate(`/dashboard/perticularquiz/${name}`)
                     }} variant="subtitle2" noWrap>
                             {name}
                           </Typography>
                         </Stack>
                       </TableCell>
                          
                        <TableCell align="left"><Button>{"published"}</Button></TableCell> 
                        <TableCell align="left"><Button style={{
                         color:"red"
                        }}>{"Delete"}</Button></TableCell>  

                       {/* <TableCell align="left">{""}</TableCell>  */}
                       {/* <TableCell align="left">{role}</TableCell> */}
                       {/* <TableCell align="left">{""}</TableCell> */}
                       {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}
                       {/* <TableCell align="left">{""}</TableCell> */}
                       {/* <TableCell align="left">
                         <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                       </TableCell> */}
                  <TableCell align="left">
                     {""}
                       </TableCell>
                       <TableCell align="right">
                         {/* <IconButton size="large" color="inherit" onClick={handleOpenMenu}> */}
                         <IconButton size="large" color="inherit">
                           {/* <Iconify icon={'eva:more-vertical-fill'} /> */}
                         </IconButton>
                       </TableCell>
                     </TableRow>
                   );
                 })}
                 {emptyRows > 0 && (
                   <TableRow style={{ height: 53 * emptyRows }}>
                     <TableCell colSpan={6} />
                   </TableRow>
                 )}
               </TableBody>

               {isNotFound && (
                 <TableBody>
                   <TableRow>
                     <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                       <Paper
                         sx={{
                           textAlign: 'center',
                         }}
                       >
                         <Typography variant="h6" paragraph>
                           Not found
                         </Typography>

                         <Typography variant="body2">
                           No results found for &nbsp;
                           <strong>&quot;{filterName}&quot;</strong>.
                           <br /> Try checking for typos or using complete words.
                         </Typography>
                       </Paper>
                     </TableCell>
                   </TableRow>
                 </TableBody>
               )}
             </Table>
           </TableContainer>
         </Scrollbar>

         <TablePagination
           rowsPerPageOptions={[8, 10, 20]}
           component="div"
           count={QuizList.length}
           rowsPerPage={rowsPerPage}
           page={page}
           onPageChange={handleChangePage}
           onRowsPerPageChange={handleChangeRowsPerPage}
         />
       </Card>
       </>
 : ""
       }



      </Container>





    


      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );


}
