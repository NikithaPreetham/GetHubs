//import {refreshUserRepoDB, insertUserRepos} from "./db_server.js";

// Refresh known user data every 5 seconds
//setInterval(refreshUserRepoDB(), 5000);

const gitIdForm = document.getElementById("gitIdForm")
let userRepos = null;

gitIdForm.addEventListener('submit', (e) => {

    e.preventDefault();
    let username = document.getElementById('username').value;
    getRepos(username);

})

//function refreshUserRepoDB(){}

function getRepos(username) {
    // Immediately show invalid username without making a malformed api call
    if(username.toString().startsWith('.')){
        populateRepoTable(null,0)
    }
    const git_repos_api_url = `https://api.github.com/users/${username}/repos`;
    axios.get(git_repos_api_url).then(res => {
        console.log(res.data);
        let totalRows = res.data.length < 5 ? res.data.length : 5;
        userRepos = res.data.slice(0,totalRows);
        populateRepoTable(userRepos,1);
        //insertUserRepos(userRepos);

    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            populateRepoTable(null,0);

        }
    })
}

function populateRepoTable(repoData,foundFlag){
    let repo_table = ``;

    if(foundFlag===0){
        repo_table +=
            `<thead class="thead-dark">
            <tr>
                <th scope="col">Value entered for username is invalid</th>
            </tr>
            </thead>`

    }
    else {
        // Repo name : name, Repo URL : html_url, Git URL : git_url, Languages: language
        repo_table +=
            `<thead class="thead-dark">
            <tr>
                <th scope="col">Repo Name</th>
                <th scope="col">Repo URL</th>
                <th scope="col">Description</th>
                <th scope="col">Languages</th>
            </tr>
            </thead>
            <tbody>`;
        for (let i = 0; i < repoData.length; i++) {
            repo_table += `
            <tr>
                <td>` + repoData[i].name + `</td>
                <td>` + repoData[i].html_url + `</td>
                <td>` + repoData[i].description + `</td>
                <td>` + repoData[i].language + `</td>
            </tr>`;
        }
    }
    repo_table +=
        `</tbody>`;

    document.getElementById("userRepos").innerHTML = repo_table;
}
