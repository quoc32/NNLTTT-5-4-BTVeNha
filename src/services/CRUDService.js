import User from '../models/user';

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                address: data.address,
                gender: data.gender === '1' ? 'Male' : 'Female'
            });
            resolve('Create a new user succeed!')
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await User.find({}).lean();
            // Map _id to id for EJS templates
            users = users.map(user => ({ ...user, id: user._id.toString() }));
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findById(userId).lean();
            if (user) {
                user.id = user._id.toString();
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findById(data.id);
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                let allUsers = await User.find({}).lean();
                allUsers = allUsers.map(u => ({ ...u, id: u._id.toString() }));
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findById(userId);

            if (user) {
                await user.deleteOne();
            }

            resolve(); // return after delete
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUserData,
    deleteUserById
}
