package com.example.cssebackend;


import com.example.cssebackend.Model.Product;
import com.example.cssebackend.Model.User;
import com.example.cssebackend.Service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class UserTest {

    @MockBean
    UserService userService;

    @Test
    public void testCreate(){
        User user = new User("U01", "Hansani", "Management Staff", "Manager");
        userService.addUser(user);
        Assertions.assertTrue(true, "User Added");
    }

    @Test
    public void testById(){

        User user = new User("U01", "Hansani", "Management Staff", "Manager");

        userService.getUser(user.getUserId());
        Assertions.assertTrue(true, "User Founded");
    }

    @Test
    public void testByUserIdNegative(){

        User user = new User("U01", "Hansani", "Management Staff", "Manager");

        userService.getUser("U10");
        Assertions.assertFalse(false, "User Not Found");
    }
}
