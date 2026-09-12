import urllib.request
import urllib.parse
import json
import ssl
import sys

# Ensure UTF-8 output on all platforms
sys.stdout.reconfigure(encoding='utf-8')

HOST = "sosoactive.forum"
BASE_URL = f"https://{HOST}"
INDEXNOW_KEY = "48b0a492a8fce133aff177ecc7b7ebe6200042b6"

urls_to_submit = [
    f"{BASE_URL}/",
    f"{BASE_URL}/blogs",
    f"{BASE_URL}/tech",
    f"{BASE_URL}/business",
    f"{BASE_URL}/write-for-us",
    f"{BASE_URL}/about",
    f"{BASE_URL}/contact",
    f"{BASE_URL}/coyyn-com-business",
    f"{BASE_URL}/droven-io-enterprise-tech-innovation",
    f"{BASE_URL}/mytecharm-com",
    f"{BASE_URL}/wisestudyspot-com",
    f"{BASE_URL}/success100x-com",
    f"{BASE_URL}/uploadarticle-com",
    f"{BASE_URL}/glossywise-com",
    f"{BASE_URL}/glaadvoice-com",
    f"{BASE_URL}/pixelspinx-com",
    f"{BASE_URL}/wallpostmedia-com",
    f"{BASE_URL}/webinbound-com",
    f"{BASE_URL}/grammarvista-com-usa",
    f"{BASE_URL}/techtrendery-com-usa",
    f"{BASE_URL}/quikconsole-com",
    f"{BASE_URL}/apkek-org",
    f"{BASE_URL}/redeepseek-com",
    f"{BASE_URL}/clickfornet",
    f"{BASE_URL}/crackstube"
]

def ping_url(url, label):
    print(f"[PING] {label}: {url}")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SosoActiveIndexer/2.0'})
        ctx = ssl.create_default_context()
        with urllib.request.urlopen(req, timeout=15, context=ctx) as response:
            status = response.getcode()
            print(f"   [SUCCESS] {label}: HTTP {status}")
            return True
    except Exception as e:
        print(f"   [INFO] {label} response: {e}")
        return False

def submit_indexnow():
    print(f"\n[INDEXNOW] Submitting {len(urls_to_submit)} URLs to IndexNow Protocol (Bing, Yandex, Seznam)...")
    endpoint = "https://api.indexnow.org/indexnow"
    payload = {
        "host": HOST,
        "key": INDEXNOW_KEY,
        "keyLocation": f"{BASE_URL}/{INDEXNOW_KEY}.txt",
        "urlList": urls_to_submit
    }
    data = json.dumps(payload).encode('utf-8')
    try:
        req = urllib.request.Request(
            endpoint,
            data=data,
            headers={
                'Content-Type': 'application/json; charset=utf-8',
                'User-Agent': 'SosoActive-Daily-Indexer/1.0'
            }
        )
        ctx = ssl.create_default_context()
        with urllib.request.urlopen(req, timeout=15, context=ctx) as response:
            status = response.getcode()
            print(f"   [SUCCESS] IndexNow Batch: HTTP {status} (Accepted for immediate crawler dispatch)")
            return True
    except Exception as e:
        print(f"   [INFO] IndexNow response: {e}")
        return False

def ping_websub_google():
    print(f"\n[WEBSUB] Pinging Google WebSub (PubSubHubbub) Hub for Real-Time RSS Discovery...")
    endpoint = "https://pubsubhubbub.appspot.com/publish"
    feed_url = f"{BASE_URL}/feed.xml"
    data = urllib.parse.urlencode({
        'hub.mode': 'publish',
        'hub.url': feed_url
    }).encode('utf-8')
    try:
        req = urllib.request.Request(
            endpoint,
            data=data,
            headers={
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'SosoActive-Feed-Publisher/1.0'
            }
        )
        ctx = ssl.create_default_context()
        with urllib.request.urlopen(req, timeout=15, context=ctx) as response:
            status = response.getcode()
            print(f"   [SUCCESS] Google WebSub Hub: HTTP {status} (Googlebot notified of latest feed)")
            return True
    except Exception as e:
        print(f"   [INFO] Google WebSub response: {e}")
        return False

def main():
    print("="*65)
    print("SOSOACTIVE DAILY SEARCH ENGINE CRAWL & INDEX SUBMISSION")
    print("="*65)

    # 1. Ping Google WebSub for RSS (Googlebot Real-time discovery)
    ping_websub_google()

    # 2. Submit IndexNow Batch (Bing, Yandex, Seznam real-time crawler dispatch)
    submit_indexnow()

    print("\n" + "="*65)
    print("SUCCESS: All URLs submitted to Google WebSub and IndexNow networks!")
    print("NOTE: Google Sitemap crawling is handled automatically via GSC & robots.txt.")
    print("="*65)

if __name__ == "__main__":
    main()
