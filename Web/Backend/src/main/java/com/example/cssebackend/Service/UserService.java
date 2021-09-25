package com.example.cssebackend.Service;

import com.example.cssebackend.Model.User;
import com.example.cssebackend.Repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //add users
    public void addUser(User user){
        userRepository.save(user);
    }

    //get User
    public Object getUser(String id){
        return userRepository.findById(id);
    }
}
