import * as React from "react";
import {Dispatch, SetStateAction} from "react";
import {
    Button,
    createTheme,
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
}


export default function InviteForm(props: IProps) {
    const vertical = 'bottom';
    const horizontal = 'center';
    const [checked, setChecked] = React.useState(false);
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
        fetch("https://q8s1qo.deta.dev/guests/confirm", {
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
            props.openSnackBar(true);
        }).catch(err => {
            props.setSuccess(false);
            props.openSnackBar(true);
        });
    };
    return (
        <ThemeProvider theme={theme}>
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
                    <Button variant="outlined" style={{color: 'lightgray'}} type="submit">POŠALJI</Button>
                </FormControl>
            </form>
        </ThemeProvider>
    );
}
