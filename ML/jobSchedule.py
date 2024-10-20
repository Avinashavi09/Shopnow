import schedule
import time
from model import train_model, load_model_and_predict

def job():
    print("Job started")
    train_model()
    print("Job Ended")
    # load_model_and_predict()

# Schedule the job every 30 minutes
# schedule.every(30).minutes.do(job)
schedule.every(30).seconds.do(job)

# Run the scheduler
while True:
    schedule.run_pending()
    time.sleep(1)
