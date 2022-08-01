import * as React from "react";
import {Dispatch, SetStateAction} from "react";
import {
    Button,
    createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Switch,
    TextField,
    ThemeProvider
} from '@mui/material';


const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: "'Cormorant SC', serif",
    },
    components: {
        MuiFormControl: {
            defaultProps: {
                margin: 'dense',
            },
        },
    },
});

interface IProps {
    setSuccess: Dispatch<SetStateAction<boolean>>;
    openSnackBar: Dispatch<SetStateAction<boolean>>;
    setSnackBarMessage: Dispatch<SetStateAction<string>>;
}


export default function InviteForm(props: IProps) {
    const [checked, setChecked] = React.useState(false);
    const [ispalaReason, setIspalaReason] = React.useState("");
    const [ispalaDialog, setIspalaDialogOpen] = React.useState(false);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [guestFirstName, setGuestFirstName] = React.useState("");
    const [guestLastName, setGuestLastName] = React.useState("");


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(firstName)
        fetch("https://nrk4nu.deta.dev/guests/confirm", {
            // fetch("http://localhost:8000/guests/confirm", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                guest_first_name: guestFirstName,
                guest_last_name: guestLastName
            })
        }).then(r => {
            props.setSuccess(r.status < 300);
            props.setSnackBarMessage('Okej, ali javi nam ako ispaljuješ ;)')
            props.openSnackBar(true);
        }).catch(err => {
            props.setSuccess(false);
            if (!firstName || !lastName){
                props.setSnackBarMessage("Alo! Upiši svoje ime i prezime!!!")
            } else {
                props.setSnackBarMessage("Nešto je pošlo po zlu :/")
            }
            props.openSnackBar(true);
        });
    };

    const handleIspala = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(firstName)
        fetch("https://nrk4nu.deta.dev/guests/reject", {
            // fetch("http://localhost:8000/guests/confirm", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                reject_reason: ispalaReason
            })
        }).then(r => {
            props.setSuccess(r.status < 300);
            props.setSnackBarMessage("Uspešno si ispalio, ''bravo''")
            props.openSnackBar(true);
            setIspalaDialogOpen(false);
            setFirstName("");
            setLastName("");
        }).catch(err => {
            props.setSuccess(false);
            if (!firstName || !lastName){
                props.setSnackBarMessage("Alo! Upiši svoje ime i prezime!!!")
            } else {
                props.setSnackBarMessage("Nešto je pošlo po zlu :/")
            }
            props.openSnackBar(true);
        });
    };

    const handleIspalaClickOpen = (event: React.FormEvent) => {
        event.preventDefault();
        setIspalaDialogOpen(true);
    };

    const handleIspalaClickClose = () => {
        setIspalaDialogOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Dialog open={ispalaDialog} onClose={handleIspalaClickClose}>
                    <DialogTitle>Zar si stvarno toliki bednik?!</DialogTitle>
                    <DialogContent>
                        <TextField
                            type="text"
                            label="Ime"
                            fullWidth
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            type="text"
                            label="Prezime"
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            label="Objasni nam zašto ako jesi"
                            variant="standard"
                            onChange={(e) => setIspalaReason(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleIspalaClickClose}>Ipak neću</Button>
                        <Button onClick={handleIspala}>Bedan sam, ispaljujem</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <form style={{zIndex: "9999"}} noValidate onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel component="legend">Upiši
                        se
                        ovde ako dolaziš!</FormLabel>
                    <TextField
                        type="text"
                        label="Ime"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Prezime"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <FormControlLabel
                        control={
                            <Switch checked={checked} onChange={handleCheckboxChange} name="isGuest"
                                    inputProps={{'aria-label': 'controlled'}}/>
                        }
                        label="Da li vodiš svoju drugu polovinu"
                    />
                    {checked &&
                    (<>
                        <TextField
                            type="text"
                            label="Ime"
                            value={guestFirstName}
                            onChange={(e) => setGuestFirstName(e.target.value)}
                        />
                        <TextField
                            type="text"
                            label="Prezime"
                            value={guestLastName}
                            onChange={(e) => setGuestLastName(e.target.value)}
                        />
                    </>)
                    }
                    <br/>
                    <Button variant="outlined" style={{color: 'lightgray'}} type="submit">POŠALJI</Button>
                    <br/>
                    <Button variant="outlined" style={{color: 'palevioletred'}} onClick={handleIspalaClickOpen}
                            >ISPALJUJEM</Button>
                </FormControl>
            </form>

        </ThemeProvider>
    );
}
