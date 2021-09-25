package com.example.cssebackend.Repository;

import com.example.cssebackend.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
