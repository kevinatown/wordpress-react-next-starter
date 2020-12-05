import requests
import os
import boto3
import json

def loop_through_posts():

    get_url = 'https://cms.kevintownsend.dev/index.php/wp-json/wp/v2/posts?per_page=100'

    page = 1
    response = requests.get(get_url + '&page=' + str(page))
    missedItems = []

    try:
        if (response.status_code == 200):
            posts = response.json()

            while len(posts) > 0:

                for post in posts:
                    # html = post['content']['rendered']

                    # urls = get_urls_from_html(html)
          
                    attachmentUrl = post['_links']['wp:attachment'][0]['href']
                  
                    attachmentResponse = requests.get(attachmentUrl)

                    try:
                        attachments = attachmentResponse.json() 
                    except:
                        missedItems.append({ 'missedUrl': attachmentUrl, 'id': post['id'], 'slug': post['slug'] })
                        print(attachmentUrl + ' failed to fetch')

                    urls = [ u['source_url'] for u in attachments ]

                    for url in urls:
                        process_url(url)

                page = page + 1
                response = requests.get(get_url + '&page=' + str(page))
                posts = response.json()
        else:
            print('page %d has a status of %d' % (page, response.status_code))
    except:
        print('page %d has a status of %d' % (page, response.status_code))


    # for item in missedItems:
    #     base_html 

    with open('missedItems.json', 'w') as fp:
        json.dump(missedItems, fp)
    print('finished')
 
def get_linked_media():
    pass       



def process_url(url):
    replacement_url = 'https://eraofgoodfeeling.files.wordpress.com'

    if not is_url_relevant(url):
        return
    
    response = requests.get(url)

    if response.status_code == 403:
        print('\nFailed url: \t' + url)

        new_url = url.replace(base_url, replacement_url)

        file_data = get_file_data_from_url(new_url)

        print(file_data)

        key = get_obj_key_from_file_data(file_data)

        if not obj_exists(key):
            print('Object already exists with key: \t' + key)
            return

        print('Downloading file at url: \t' + new_url)
        download_file(new_url, file_data['local_filename'], file_data['dirs'])

        print('Uploading file to S3 with key: \t' + key)
        upload_to_s3(file_data['local_filename'], key)
    else:
        print('\nSuccessfully retrieved object at url: \t' + url)

def download_file(url, local_filename, local_dirs):
    if not os.path.exists('.' + local_dirs):
        os.makedirs('.' + local_dirs)

    # NOTE the stream=True parameter below
    with requests.get(url, stream=True) as r:
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192): 
                if chunk: # filter out keep-alive new chunks
                    f.write(chunk)
                    # f.flush()

def get_file_data_from_url(url):
    local_filename = '.' + url.split('/wp-content/uploads')[-1]
    filename = local_filename.split('/')[-1]
    local_dirs = local_filename[:local_filename.find(filename)]
    print(local_filename, filename, local_dirs)
    return {
        'local_filename': local_filename,
        'dirs': local_dirs[1:],
        'filename': filename
    }

def get_obj_key_from_file_data(file_data):
    return 'wp-content/uploads' + file_data['dirs'] + file_data['filename'] 

def obj_exists(key):
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(bucket_name)
    objs = list(bucket.objects.filter(Prefix=key))

    return len(objs) > 0 and objs[0].key == key

def upload_to_s3(local_filename, key):
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(bucket_name)
    bucket.upload_file(local_filename, key) 

        
def get_urls_from_html(html):
    urls = []
    found_idx = html.find('href="')

    while found_idx > 0:

        start_idx = found_idx + 6
        end_idx = html.find('"', start_idx)

        urls.append(html[start_idx : end_idx])

        html = html[end_idx:]
        found_idx = html.find('href="')

    return set(urls)

def is_url_relevant(url):
    return base_url in url
 
base_url = 'https://eraofgoodfeeling.files.wordpress.com'
url = 'https://cms.kevintownsend.dev/index.php/wp-json/wp/v2/posts'
bucket_name = 'era-of-good-feeling'

loop_through_posts()