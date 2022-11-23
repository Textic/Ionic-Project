from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
import time
from colorama import Fore, Back, Style, init

init(autoreset=True)
testList = []

def test_login():
    try:
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=Options())
        driver.get("http://localhost:8100/login/")
        driver.find_element(By.NAME, "ion-input-0").click()
        driver.find_element(By.NAME, "ion-input-0").send_keys("dai.gonzalez")
        driver.find_element(By.NAME, "ion-input-1").click()
        driver.find_element(By.NAME, "ion-input-1").send_keys("123456")
        driver.find_element(By.CSS_SELECTOR, ".ion-color").click()
        time.sleep(4)
        text = driver.find_element(By.ID, "title").text
        testList.append(f"Test Login: {Fore.GREEN}PASSED")
        driver.quit()
        return
    except:
        testList.append(f"Test Login: {Fore.RED}FAILED")
        driver.quit()
        return

def test_driverNavegation():
    try:
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=Options())
        driver.get("http://localhost:8100/login/")
        driver.find_element(By.NAME, "ion-input-0").click()
        driver.find_element(By.NAME, "ion-input-0").send_keys("dai.gonzalez")
        driver.find_element(By.NAME, "ion-input-1").click()
        driver.find_element(By.NAME, "ion-input-1").send_keys("123456")
        driver.find_element(By.CSS_SELECTOR, ".ion-color").click()
        time.sleep(4)
        driver.find_element(By.XPATH, '//*[@id="segment"]/ion-segment-button[1]').click()
        time.sleep(4)
        driver.find_element(By.XPATH, '/html/body/app-root/ion-app/ion-split-pane/ion-router-outlet/app-driver/ion-header/ion-toolbar[2]/ion-segment/ion-segment-button[1]').click()
        time.sleep(4)
        dmap = driver.find_element(By.ID, "mapDriver")
        testList.append(f"Test Driver Navegation: {Fore.GREEN}PASSED")
        driver.quit()
        return
    except:
        testList.append(f"Test Driver Navegation: {Fore.RED}FAILED")
        driver.quit()
        return

def test_passengerNavegation():
    try:
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=Options())
        driver.get("http://localhost:8100/login/")
        driver.find_element(By.NAME, "ion-input-0").click()
        driver.find_element(By.NAME, "ion-input-0").send_keys("dai.gonzalez")
        driver.find_element(By.NAME, "ion-input-1").click()
        driver.find_element(By.NAME, "ion-input-1").send_keys("123456")
        driver.find_element(By.CSS_SELECTOR, ".ion-color").click()
        time.sleep(4)
        driver.find_element(By.XPATH, '//*[@id="segment"]/ion-segment-button[2]').click()
        time.sleep(4)
        driver.find_element(By.XPATH, '/html/body/app-root/ion-app/ion-split-pane/ion-router-outlet/app-passenger/ion-header/ion-toolbar[2]/ion-segment/ion-segment-button[2]').click()
        time.sleep(4)
        pmap = driver.find_element(By.ID, "mapPass")
        testList.append(f"Test Passenger Navegation: {Fore.GREEN}PASSED")
        driver.quit()
        return
    except:
        testList.append(f"Test Passenger Navegation: {Fore.RED}FAILED")
        driver.quit()
        return

test_login()
test_driverNavegation()
test_passengerNavegation()

print("\n\n")
for test in testList:
    print(test)
print("\n")