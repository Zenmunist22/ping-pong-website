import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
class user {
    name!: string;
    ucfId!: string;
    knightsEmail!: string;
    rating!: string;
}
var userList: user[] = [];

function contains(list:user[], obj:user){
    var i = list.length;
    while (i--){
        if (list[i].name === obj.name){
            return true;
        }
        return false;
    }
}

export default function CheckinForm() {
    
    const navigate = useNavigate();
    const [form, setForm] = useState({
        ucfId: ""
    });
    const [users, setUsers] = useState<user[]>([]);

    


    function updateForm(value: { ucfId?: string;}) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
    }

    useEffect(() => {
        setUsers(userList);
    }, [userList])
    

    async function onSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
    
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };
    
        const response = await fetch(`http://localhost:5000/checkin/${form.ucfId!}`);

        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        var record = await response.json() as user;

        if (!record) {
            window.alert("Record not found.");
            return;
        }
        if (record){
            if (!contains(userList, record)){
                userList.push(record);
            }
            
        }
        


        setForm({ ucfId: "" });
        navigate("/checkin?success=yes");
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="position">UCF ID</label>
                <input
                    type="text"
                    className="form-control"
                    id="position"
                    value={form.ucfId}
                    required
                    onChange={(e) => updateForm({ ucfId: e.target.value })}
                />
            </div>
            <div className="form-group">
                <input
                    type="submit"
                    value="Check-In"
                    className="btn btn-primary"
                />
            </div>
            </form>
            <div>
                <h1>
                    Attendance Sheet
                </h1>
                <ul>
                    {users.map((users, index) =>{
                        return (
                            <li key={index}>
                                {users.name} / {users.knightsEmail}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
        
    );
}