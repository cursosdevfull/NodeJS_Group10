from locust import task, TaskSet, HttpLocust
import json

class UserBehaviour_UserA(TaskSet):
    def on_start(self):
        response = self.client.post("/auth/login",{email: "sergio@correo.com", password: "123456"})
        self.token = response.json()["accessToken"]

    @task(10)
    def list_users(self):
        self.client.get("/user", headers={"Authorization": "Bearer {}".format(self.token)})

    @task(2)
    def list_user_one(self):
        self.client.get("/user/efaff3b2-85c0-4b39-bb1d-0bbf25390d3d", headers={"Authorization": "Bearer {}".format(self.token)})

class UserBehaviour_UserB(TaskSet):
    def on_start(self):
        response = self.client.post("/auth/login",{email: "sergio@correo.com", password: "123456"})
        self.token = response.json()["accessToken"]

    @task(3)
    def list_users(self):
        self.client.get("/user", headers={"Authorization": "Bearer {}".format(self.token)})

    @task(5)
    def list_user_one(self):
        self.client.get("/user/efaff3b2-85c0-4b39-bb1d-0bbf25390d3d", headers={"Authorization": "Bearer {}".format(self.token)})



class Test_UserA(HttpLocust):
    task_set = UserBehaviour_UserA
    min_wait = 2000
    max_wait = 5000  

class Test_UserB(HttpLocust):
    task_set = UserBehaviour_UserB
    min_wait = 3000
    max_wait = 4000  
      