import { CircularProgress } from "@mui/material";
function Spiner(){
    return (
        <div
            style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            }}
        >
            <CircularProgress
                size="3rem"
                aria-label="Loading…"
                color="warning"
            />
        </div>
    );
}
export default Spiner;