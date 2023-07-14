import "./App.css";
import { Button } from "@ultraviolet/ui";
import { useNavigate } from "react-router-dom";

function App() {
	const navigate = useNavigate();

	return (
		<>
			<div className="flex flex-col items-center gap-4 justify-center m-20">
				<h1 className="text-4xl font-bold p-4 text-center">Home</h1>
				<Button
					onClick={() => {
						navigate("/servers");
					}}
					sentiment="primary"
					role="link"
					icon="arrow-right"
				>
					Go to servers
				</Button>
			</div>
		</>
	);
}

export default App;
