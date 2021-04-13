import React, {useEffect,useState} from 'react';
import Loader from "react-loader-spinner";
import {authentication} from '../firebase/firebase';
import Popup from 'reactjs-popup';
import dateFormat from "dateformat";

// import './Financials.css'
const Organise = (props)=>{
    // states for the organise tab
    const [loader,setLoader] = useState(true);
    const [newFile, setNewFile] = useState({
        fileName: "",
        fileDescription: ""
    });
    const [files,setFiles] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [userId,setUserId] = useState();
    const [fileSelected,setFileSelected] = useState(null);
    const [showFileUploadDialog, setShowFileUploadDialog] = useState(false);
    const [nameInvalid, setNameInvalid] = useState("fileUpload-text");
    const [descriptionInvalid, setDescriptionInvalid] = useState("fileUpload-text");
    const [fileSelectedInvalid, setFileSelectedInvalid] = useState("selectFileBtn");

    // aws s3 url
    const aws_url = "https://testing-bt.s3.amazonaws.com/";

    // watch file data for page refresh
    useEffect(()=>{
        getFiles()
    },[])

    // get file data
    const getFiles = ()=>{
        authentication.onAuthStateChanged((user)=>{
            setUserId(user.uid);
            fetch(`https://mutualism-test.herokuapp.com/api/getFiles?userId=${user.uid}`)
            .then((re)=>re.json())
            .then((re)=>{
                // console.log(re);
                // store files and filtered file arrays for filtering functionality
                if(re.files.length !== 0){
                    let files = JSON.parse(re.files);
                    setFiles(files);
                    setFilteredFiles(files);
                }else{
                    setFiles([]);
                    setFilteredFiles([]);
                }
                setLoader(false);
            })
        });
    }

    // search and filter out files
    const filterFiles = (searchValue) => {
        // filtering the files array using query string on both name and description of file
        const filtered = files.filter((file)=> {
            if((file.fields.file_description.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) ||
                (file.fields.file_name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
            ){
                // store in filtered items array files for which the name or description contains the query string
                return true;
            }
        });
        // check if the outcome array has objects before setting the state
        (filtered.length !== 0)?setFilteredFiles(filtered):setFilteredFiles([]);
    }

    // clear the search filter
    // const clearFilter = () => {
    //     setSearchQuery("");
    //     setFilteredFiles(files);
    // }

    // delete the file data
    const deleteFile = (event)=>{
        // console.log(event.target.id);
        let fileId = parseInt(event.target.id);
        setLoader(true);
        fetch(`https://mutualism-test.herokuapp.com/api/deleteFile?id=${fileId}`)
            .then((re)=>re.json())
            .then((re)=>{
                // console.log(re);
                getFiles();
            });
        }

    // method for file uploads
    const uploadFile = ()=>{
        let name = newFile.fileName;
        let description = newFile.fileDescription;
        let standardTextboxStyle = "fileUpload-text";
        let standardFileUploadStyle = "selectFileBtn";
        if (!name || !description || !fileSelected){
            // console.log("Empty cells");
            (!name)?setNameInvalid("fileUpload-text border-danger"):setNameInvalid(standardTextboxStyle);
            (!description)?setDescriptionInvalid("fileUpload-text border-danger"):setDescriptionInvalid(standardTextboxStyle);
            (!fileSelected)?setFileSelectedInvalid("selectFileBtn upload-invalid"):setFileSelectedInvalid(standardFileUploadStyle);
        }else {
            // setNameInvalid("fileUpload-text");
            // setDescriptionInvalid("fileUpload-text");
            // setFileSelectedInvalid("selectFileBtn");
            // setShowFileUploadDialog(false);


            setLoader(true);
            var file_input = document.getElementById("fileInput");
            var file = file_input.files[0];
            var form_data = new FormData();
            form_data.append("file", file);
            form_data.append("userId", userId);
            form_data.append("fileName", name);
            form_data.append("fileDescription", description);
            fetch(`https://mutualism-test.herokuapp.com/api/uploadFile`, {
                method: 'POST',
                body: form_data,
            })
                .then((re) => re.json())
                .then((re) => {
                    setNewFile({
                        fileName: "",
                        fileDescription: ""
                    });
                    setFileSelected(null);
                    getFiles();
                });
        }
    }

    const cancelUpload = () =>{
        setNewFile({
            fileName: "",
            fileDescription: ""
        });
        setFileSelected(null);
        setNameInvalid("fileUpload-text");
        setDescriptionInvalid("fileUpload-text");
        setFileSelectedInvalid("selectFileBtn");
        getFiles();
        setShowFileUploadDialog(false);
    }

    // file name for view
    const getFileName = (file_url) =>{
        // console.log(file_url.split("\\")[2]);
        let file_name_array = file_url.split('\\');
        return file_name_array[2];
    }
    // view files loaded
    const displayFiles = ()=>{
        if(filteredFiles.length === 0){
            return <p style={{color:'gray',marginTop:20,fontSize:13}}>No files available.</p>
        }
        else{
            return filteredFiles.map((file,index)=>{
                return(
                    <div className="file row" key={index}>
                        {/*<p>{getFileName(file.fields._file)}</p>*/}
                        <p className="col-4 col-lg-2 col-md-2 col-sm-2">{file.fields.file_name}</p>
                        <p className="col-lg-5 col-md-5 col-sm-5 uploadFileDesc">{file.fields.file_description}</p>
                        <p className="col-lg-2 col-md-2 col-sm-2 uploadFileDate">{dateFormat(file.fields.upload_date,"dddd dS mmmm, yyyy")}</p>
                        <div className="col-4 col-lg-2 col-md-2 col-sm-2 fileOptions">
                            <a href={aws_url+file.fields._file} download target="_blank">Download</a>
                            <p id={file.pk} onClick={deleteFile}>Delete</p>
                        </div>
                    </div>
                )
            })
        }
    }

    return(
        <>
            <div className="uploadNewFile">
                <div>
                    {/* <form onSubmit={filterFiles}> */}
                        <input
                            type="text"
                            // value={searchQuery}
                            onChange={(val)=> filterFiles(val.target.value)}
                            placeholder="Find..."
                            className="fileSearch"/>
                        {/* <button className="btn btn-dark" style={{marginRight:"5px"}}>Search</button> */}
                        {/* <button className="btn btn-outline-dark" onClick={clearFilter}>Clear</button> */}
                    {/* </form> */}
                </div>
                <Popup modal open={showFileUploadDialog} onClose={cancelUpload} trigger={<button className="status-button-prompt action-button">Add file</button>}>
                    <input
                        type="text" value={newFile.fileName} placeholder="name"
                        onChange={(val) => setNewFile({...newFile, fileName: val.target.value})}
                        className={nameInvalid}/>
                    <input
                        type="text"
                        value={newFile.fileDescription}
                        placeholder="description"
                        onChange={(val)=> setNewFile({...newFile, fileDescription:val.target.value})}
                        className={descriptionInvalid}/>
                    <br/>
                    <div className={fileSelectedInvalid}>
                        <input type="file" id="fileInput" onChange={(val)=>setFileSelected(val.target.value)}/>
                        <p style={{margin:0}}>
                            {fileSelected === null?
                                "Select file or drop file"
                                :
                                getFileName(fileSelected)
                            }
                        </p>
                    </div>
                    <div className="uploadFileBtn">
                        <button onClick={uploadFile} style={{width:"100%"}} type="submit" className="form-control saveBtn col-6">Upload</button>
                        {/*<button onClick={cancelUpload} style={{width:"50%"}} type="submit" className="form-control saveBtn col-6">Cancel</button>*/}
                    </div>
                </Popup>
                
            </div>

            <div className="userFiles">
                {loader === true?
                    <>
                        <br/><br/><br/><br/>
                        <Loader type="ThreeDots" color="#212529" height={50} width={50}/>
                    </>
                    :
                    displayFiles()

                }
            </div>
        </>
    )
}
export default Organise