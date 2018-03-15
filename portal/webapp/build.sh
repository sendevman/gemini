cp -r WEB-INF build/
cd build/
tar -czvf ../ROOT.zip .
cd ../
scp ROOT.zip c_fpalou@tmax1o1:/tmp/
