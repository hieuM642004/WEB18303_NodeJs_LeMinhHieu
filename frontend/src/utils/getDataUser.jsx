function getUsersFromLocalStorage() {
    const usersData = localStorage.getItem('user');
    if (usersData) {
        try {
            const parsedUsers = JSON.parse(usersData);
            return parsedUsers
        } catch (error) {
            console.error('Error parsing users data from localStorage:', error);
            return [];
        }
    } else {
        return [];
    }
}

export default getUsersFromLocalStorage;
